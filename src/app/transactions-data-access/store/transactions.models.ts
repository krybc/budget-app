import {EntityState} from '@ngrx/entity';
import {DateTime} from 'luxon';
import {Account} from '@accounts-data-access';
import {Category} from '@categories-data-access';
import {Contractor} from '@contractors-data-access';

export interface Transactions extends EntityState<Transaction> {
}

export interface Transaction {
  id?: number;
  category: Category;
  account: Account;
  contractor: Contractor;
  date: DateTime;
  income: number;
  expense: number;
  description: string;
}

export interface TransactionsFilters {
  month: DateTime;
  category: Category;
  account: Account;
  contractor: Contractor;
}
