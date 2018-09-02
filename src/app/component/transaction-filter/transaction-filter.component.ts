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
  @Input() filtersSubject: BehaviorSubject<any>;
  form: FormGroup;
  filters: any = {
    category: null,
    month: null,
    contractor: null
  };

  constructor(
    private contractorService: ContractorService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    this.filtersSubject.subscribe((filters) => {
      this.filters = filters;
    });

    this.createForm();
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
      this.filters = this.form.value;
      this.filtersSubject.next(this.filters);
      datepicker.close();
    }
  }

  onChangeCategory(category: MatSelectChange): void {
    if (this.form.valid) {
      this.form.get('category').setValue(category.value);
      this.filters = this.form.value;
      this.filtersSubject.next(this.filters);
    }
  }

  onChangeContractor(contractor: MatSelectChange): void {
    if (this.form.valid) {
      this.form.get('contractor').setValue(contractor.value);
      this.filters = this.form.value;
      this.filtersSubject.next(this.filters);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.filtersSubject.next({...this.form.value});
    }
  }

}
