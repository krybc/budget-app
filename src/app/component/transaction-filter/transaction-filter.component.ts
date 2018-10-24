import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ContractorService} from '../../service/contractor.service';
import {CategoryService} from '../../service/category.service';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {Moment} from 'moment';
import {MatSelectChange} from '@angular/material';
import {FiltersStore} from '../../store/filters.store';
import {FiltersState} from '../../state/filters.state';

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
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
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

  onChangeMonth(month: Moment, datepicker: MatDatepicker<Moment>): void {
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
