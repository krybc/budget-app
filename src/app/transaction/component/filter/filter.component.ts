import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatSelectChange} from '@angular/material/select';
import {FiltersStore} from '../../../core/store/filters.store';
import {FiltersState} from '../../../core/state/filters.state';
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
  selector: 'app-transaction-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TransactionFilterComponent implements OnInit {
  @Input() categoryList: any[];
  @Input() contractorList: any[];
  filters: FiltersState;
  form: FormGroup;

  constructor(
    private filtersStore: FiltersStore
  ) { }

  ngOnInit() {
    this.filtersStore.state$.subscribe(filters => {
      this.filters = filters;
      this.createForm();
    });
  }

  createForm() {
    this.form = new FormGroup({
      category: new FormControl(this.filters.category, [

      ]),
      month: new FormControl(this.filters.month, [

      ]),
      contractor: new FormControl(this.filters.contractor, [

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

  onChangeCategory(category: MatSelectChange): void {
    if (this.form.valid) {
      this.form.get('category').setValue(category.value);
      this.filters = this.form.value;
      this.filtersStore.setCategory(category.value);
    }
  }

  onChangeContractor(contractor: MatSelectChange): void {
    if (this.form.valid) {
      this.form.get('contractor').setValue(contractor.value);
      this.filters = this.form.value;
      this.filtersStore.setContractor(contractor.value);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.filtersStore.setState({...this.form.value});
    }
  }

}
