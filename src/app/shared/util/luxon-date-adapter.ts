import { Inject, Injectable, Optional } from '@angular/core';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material';
import { DateTime, Info } from 'luxon';

function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

const SUPPORTS_INTL_API = typeof Intl != 'undefined';

const DEFAULT_DATE_NAMES = range(31, i => String(i + 1));

export class LuxonDateAdapter extends DateAdapter<DateTime> {

  getYear(date: DateTime): number {
    return date.year;
  }

  getMonth(date: DateTime): number {
    return date.month - 1;
  }

  getDate(date: DateTime): number {
    return date.day;
  }

  getDayOfWeek(date: DateTime): number {
    return date.weekday;
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    return Info.months(style);
  }

  getDateNames(): string[] {
    if (SUPPORTS_INTL_API) {
      const dtf = new Intl.DateTimeFormat(this.locale, { day: 'numeric' });
      return range(31, i => this._stripDirectionalityCharacters(
        dtf.format(new Date(2017, 0, i + 1))));
    }
    return DEFAULT_DATE_NAMES;
  }


  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    return Info.weekdays(style);
  }

  getYearName(date: DateTime): string {
    if (SUPPORTS_INTL_API) {
      const dtf = new Intl.DateTimeFormat(this.locale, { year: 'numeric' });
      const valueOfDate = date.valueOf();
      return this._stripDirectionalityCharacters(dtf.format(valueOfDate));
    }
    return String(this.getYear(date));
  }

  getFirstDayOfWeek(): number {
    return 0;
  }

  getNumDaysInMonth(date: DateTime): number {
    return date.daysInMonth;
  }

  clone(date: DateTime): DateTime {
    return date;
  }

  createDate(year: number, month: number, date: number): DateTime {
    month += 1;
    const aDate = DateTime.utc(year, month, date);
    return aDate;
  }

  today(): DateTime {
    return DateTime.local();
  }

  format(date: DateTime, displayFormat: any): string {
    return date.toFormat(displayFormat);
  }

  addCalendarYears(date: DateTime, years: number): DateTime {
    return date.plus({ years: years });
  }

  addCalendarMonths(date: DateTime, months: number): DateTime {
    return date.plus({ months: months });
  }

  addCalendarDays(date: DateTime, days: number): DateTime {
    return date.plus({ days: days });
  }

  toIso8601(date: DateTime): string {
    return date.toISO();
  }

  isDateInstance(obj: any): boolean {
    return (obj instanceof DateTime);
  }

  isValid(date: DateTime): boolean {
    return date.isValid;
  }

  invalid(): DateTime {
    return DateTime.invalid('Invalid set via luxon-date-adapter.');
  }

  parse(value: any, parseFormat: any): DateTime | null {
    if (value && typeof value === 'string') {
      const aDateTime = DateTime.fromISO(value);
      if (aDateTime.isValid === true) {
        return aDateTime;
      }
      return DateTime.fromFormat(value, parseFormat);
    }
    return value;
  }

  private _stripDirectionalityCharacters(str: string) {
    return str.replace(/[\u200e\u200f]/g, '');
  }

  deserialize(value: any): DateTime | null {
    let date;
    if (value instanceof Date) {
      date = DateTime.fromJSDate(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      date = DateTime.fromISO(value);
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }
}
