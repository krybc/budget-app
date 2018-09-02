import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {FiltersState} from '../../state/filters.state';
import * as moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {Moment} from 'moment';
import {MatDatepicker} from '@angular/material';

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
  @Input() filtersSubject: BehaviorSubject<any>;
  form: FormGroup;

  constructor(
    private filtersState: FiltersState,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      month: new FormControl(new Date(Date.now()), [
        Validators.required
      ]),
    });
  }

  onChangeMonth(month: Moment, datepicker: MatDatepicker<Moment>): void {
    if (this.form.valid) {
      this.form.get('month').setValue(month);
      this.filtersSubject.next({month});
      datepicker.close();
    }
  }
}
