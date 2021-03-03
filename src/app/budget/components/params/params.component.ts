import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {DateTime} from 'luxon';
import {BudgetParams} from '@budget-data-access';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MONTH_FORMATS} from '@shared/date';

@Component({
  selector: 'app-budget-filters',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MONTH_FORMATS },
  ]
})
export class BudgetParamsComponent implements OnInit {
  @Input()
  get params() {
    return this._params;
  }
  set params(value: BudgetParams) {
    this._params = value;
    this.form.patchValue(value);
  }
  private _params: BudgetParams;

  @Output() paramsChanged = new EventEmitter<BudgetParams>();
  form: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = new FormGroup({
      month: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onChangeMonth(month: DateTime, datepicker: MatDatepicker<DateTime>): void {
    if (this.form.valid) {
      this.form.get('month').setValue(month);
      datepicker.close();
      this.paramsChanged.emit({ month });
    }
  }
}
