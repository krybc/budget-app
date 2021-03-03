import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Transaction, TransactionsFilters} from './transactions.models';

import * as fromTransactions from './transactions.reducer';
import * as TransactionsSelectors from './transactions.selectors';
import {TransactionsActions} from './transactions.actions';


@Injectable()
export class TransactionsFacade {
  transactions$ = this.store.pipe(select(TransactionsSelectors.getTransactions));
  filteredTransactions$ = this.store.pipe(select(TransactionsSelectors.getFilteredTransactions));
  transactionsLoaded$ = this.store.pipe(select(TransactionsSelectors.isTransactionsLoaded));
  selectedTransactions$ = this.store.pipe(select(TransactionsSelectors.getSelectedTransaction));
  filters$ = this.store.pipe(select(TransactionsSelectors.getFilters));

  constructor(
    private store: Store<fromTransactions.TransactionsPartialState>
  ) {
  }

  initTransactions() {
    this.store.dispatch(TransactionsActions.initTransactions());
  }

  loadTransactions() {
    this.store.dispatch(TransactionsActions.loadTransactions());
  }

  selectTransaction(id: number) {
    this.store.dispatch(TransactionsActions.selectTransaction({id}));
  }

  createTransaction(transaction: Transaction) {
    this.store.dispatch(TransactionsActions.createTransaction({transaction}));
  }

  updateTransaction(transaction: Transaction) {
    this.store.dispatch(TransactionsActions.updateTransaction({transaction}));
  }

  deleteTransaction(transaction: Transaction) {
    this.store.dispatch(TransactionsActions.deleteTransaction({transaction}));
  }

  setFilters(filters: TransactionsFilters) {
    this.store.dispatch(TransactionsActions.setFilters({filters}));
  }
}
