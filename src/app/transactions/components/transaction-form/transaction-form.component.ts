import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DateTime} from 'luxon';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {categoriesFactories, Category} from '@categories-data-access';
import {Account} from '@accounts-data-access';
import {Contractor} from '@contractors-data-access';
import {Transaction} from '@transactions-data-access';

interface QueryParams {
  category: number;
  account: number;
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit {
  @Input() accounts: Account[];
  @Input()
  get categories() {
    return this._categories;
  }
  set categories(value: Category[]) {
    this._categories = value;
    this.categoriesTree = categoriesFactories.createTree(value);
  }
  private _categories: Category[];

  @Input() contractors: Contractor[];

  @Input()
  get params() {
    return this._params;
  }
  set params(value: any) {
    this._params = value;
  }
  private _params: QueryParams;

  @Input()
  set transaction(value: Transaction) {
    this.model = value;
    this.form.patchValue(value);
  }

  @Output() changed = new EventEmitter<Transaction>();
  filteredContractors: Observable<Contractor[]>;
  categoriesTree: Category[];
  model: Transaction;
  form: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
    this.filteredContractors = this.form.get('contractor').valueChanges
      .pipe(
        startWith<string | Contractor>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._contractorFilter(name) : this.contractors.slice())
      );
  }

  createForm() {
    this.form = new FormGroup({
      category: new FormControl(null, [
        Validators.required
      ]),
      account: new FormControl(null, [
        Validators.required
      ]),
      contractor: new FormControl(null, [
        Validators.required,
      ]),
      date: new FormControl(DateTime.local(), [
        Validators.required
      ]),
      income: new FormControl(0),
      expense: new FormControl(0),
      description: new FormControl(null)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.changed.emit({
        ...this.model,
        ...this.form.value,
        income: parseFloat(this.form.get('income').value),
        expense: parseFloat(this.form.get('expense').value)
      });
    }
  }

  contractorAutocompleteDisplay(contractor?: Contractor): string | undefined {
    return contractor ? contractor.name : undefined;
  }

  private _contractorFilter(value: string): Contractor[] {
    const filterValue = value.toLowerCase();

    return this.contractors.filter(option => option.name.toLowerCase().includes(filterValue));
  }
}
