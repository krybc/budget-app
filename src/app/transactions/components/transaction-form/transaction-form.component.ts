import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CategoriesFactories, Category} from '@categories-data-access';
import {Account} from '@accounts-data-access';
import {Contractor} from '@contractors-data-access';
import {Transaction} from '@transactions-data-access';
import {TransactionForm} from '@transactions/forms/transaction.form';
import {Params} from '@angular/router';

interface QueryParams {
  category: number;
  account: number;
}

interface Props {
  accounts: Account[];
  categories: Category[];
  contractors: Contractor[];
  queryParams?: Params;
  transaction?: Transaction;
}

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  providers: [TransactionForm]
})
export class TransactionFormComponent implements OnChanges {
  @Input()
  set props(value: Props) {
    this.handleProps(value);
  }

  accounts: Account[];
  categories: Category[];
  contractors: Contractor[];

  get queryParams() {
    return this._queryParams;
  }
  set queryParams(value: Params) {
    if (value.account) {
      this._queryParams = { ...this._queryParams, account: parseInt(value.account, 10) };
    }
    if (value.category) {
      this._queryParams = { ...this._queryParams, category: parseInt(value.category, 10) };
    }
  }
  private _queryParams: QueryParams;

  @Output() changed = new EventEmitter<Transaction>();
  filteredContractors: Observable<Contractor[]>;
  categoriesTree: Category[];
  model: Transaction;
  form: FormGroup;

  constructor(
    private transactionForm: TransactionForm,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.categories && this.contractors && this.accounts) {
      this.applyInitialModel();
      this.form = this.transactionForm.init(this.model);

      this.filteredContractors = this.form.get('contractor').valueChanges
        .pipe(
          startWith<string | Contractor>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._contractorFilter(name) : this.contractors.slice())
        );
    }
  }

  onSubmit() {
    if (this.transactionForm.isValid) {
      this.changed.emit(this.transactionForm.value);
    }
  }

  contractorAutocompleteDisplay(contractor?: Contractor): string | undefined {
    return contractor ? contractor.name : undefined;
  }

  private _contractorFilter(value: string): Contractor[] {
    const filterValue = value.toLowerCase();

    return this.contractors.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  private handleProps(value: Props): void {
    if (value.accounts) {
      this.accounts = value.accounts;
    }

    if (value.categories) {
      this.categories = value.categories;
      this.categoriesTree = CategoriesFactories.createTree(value.categories);
    }

    if (value.contractors) {
      this.contractors = value.contractors;
    }

    if (value.queryParams) {
      this.queryParams = value.queryParams;
    }

    if (value.transaction) {
      this.model = value.transaction;
    }
  }

  private applyInitialModel() {
    if (this.queryParams && this.queryParams.account) {
      this.model = { ...this.model, account: this.accounts.find(it => it.id === this.queryParams.account) ?? null };
    }
    if (this.queryParams && this.queryParams.category) {
      this.model = { ...this.model, category: CategoriesFactories.getCategoryFromTree(this.categoriesTree, this.queryParams.category) };
    }
    if (this.accounts.length === 1) {
      this.model = { ...this.model, account: this.accounts[0] };
    }
  }
}
