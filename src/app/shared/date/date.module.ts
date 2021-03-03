import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LuxonDateAdapter} from './adapters/luxon-date-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const MONTH_FORMATS = {
  parse: {
    dateInput: 'yyyy.LL',
  },
  display: {
    dateInput: 'yyyy.LL',
    monthYearLabel: 'LLL yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'LLL yyyy'
  },
};

export const DATE_FORMATS = {
  parse: {
    dateInput: 'yyyy.LL.dd',
  },
  display: {
    dateInput: 'yyyy.LL.dd',
    monthYearLabel: 'LLL yyyy dd',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'LLL yyyy'
  },
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS },
  ]
})
export class SharedDateModule { }
