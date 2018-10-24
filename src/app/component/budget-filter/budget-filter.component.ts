import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {FiltersState} from '../../state/filters.state';
import * as moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment} from 'moment';
import {MatDatepicker} from '@angular/material';
import {FiltersStore} from '../../store/filters.store';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-budget-filter',
  templateUrl: './budget-filter.component.html',
  styleUrls: ['./budget-filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
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

  onChangeMonth(month: Moment, datepicker: MatDatepicker<Moment>): void {
    if (this.form.valid) {
      this.form.get('month').setValue(month);
      this.filtersStore.setMonth(month);
      datepicker.close();
    }
  }
}
