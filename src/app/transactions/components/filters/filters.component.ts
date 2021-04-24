import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDatepicker} from '@angular/material/datepicker';
import {MatSelectChange} from '@angular/material/select';
import {DateTime} from 'luxon';
import {CategoriesFactories, Category} from '@categories-data-access';
import {Contractor} from '@contractors-data-access';
import {TransactionsFilters} from '@transactions-data-access';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MONTH_FORMATS} from '@shared/date';


@Component({
  selector: 'app-transactions-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MONTH_FORMATS },
  ]
})
export class TransactionsFiltersComponent implements OnInit {
  @Input() contractors: Contractor[];
  @Input() accounts: Account[];

  @Input()
  get categories() { return this._categories; }
  set categories(value: Category[]) {
    this._categories = value;
    this.categoriesTree = CategoriesFactories.createTree(value);
  }
  private _categories: Category[];

  @Input()
  get filters() {
    return this._filters;
  }
  set filters(value: TransactionsFilters) {
    this._filters = value;
    this.form.patchValue(value);
  }
  private _filters: TransactionsFilters;

  @Output() filtersChanged = new EventEmitter<TransactionsFilters>();
  form: FormGroup;
  categoriesTree: Category[];

  constructor(
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.form = new FormGroup({
      month: new FormControl(null, []),
      category: new FormControl(null, []),
      contractor: new FormControl(null, []),
    });
  }

  onChangeMonth(month: DateTime, datepicker: MatDatepicker<DateTime>): void {
    console.log(month);
    if (this.form.valid) {
      this.form.get('month').setValue(month);
      datepicker.close();
      this.filtersChanged.emit(this.form.value);
    }
  }

  onChangeCategory(category: MatSelectChange): void {
    if (this.form.valid) {
      this.form.get('category').setValue(category.value);
      this.filters = this.form.value;
      this.filtersChanged.emit(this.form.value);
    }
  }

  onChangeContractor(contractor: MatSelectChange): void {
    if (this.form.valid) {
      this.form.get('contractor').setValue(contractor.value);
      this.filters = this.form.value;
      this.filtersChanged.emit(this.form.value);
    }
  }
}
