import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FiltersState} from '../../../core/state/filters.state';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FiltersStore} from '../../../core/store/filters.store';
import {LuxonDateAdapter} from '../../../shared/util/luxon-date-adapter';
import {DateTime} from 'luxon';

export const MY_FORMATS = {
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

@Component({
  selector: 'app-budget-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class BudgetFilterComponent implements OnInit {
  filters: FiltersState;
  form: FormGroup;

  constructor(
    private filtersStore: FiltersStore,
  ) { }

  ngOnInit() {
    this.filtersStore.state$.subscribe(filters => {
      this.filters = filters;
      this.createForm();
    });
  }

  createForm() {
    this.form = new FormGroup({
      month: new FormControl(this.filters.month, [
        Validators.required
      ]),
    });
  }

  onChangeMonth(month: DateTime, datepicker: MatDatepicker<DateTime>): void {
    if (this.form.valid) {
      this.form.get('month').setValue(month);
      this.filtersStore.setMonth(month);
      datepicker.close();
    }
  }
}
