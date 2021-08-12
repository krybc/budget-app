import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State, TRANSACTIONS_FEATURE_KEY, transactionsAdapter, TransactionsPartialState} from './transactions.reducer';
import {Transaction, TransactionsFilters} from './transactions.models';
import {Settings} from 'luxon';

export const getTransactionsState = createFeatureSelector<TransactionsPartialState, State>(
  TRANSACTIONS_FEATURE_KEY
);

export const transactionsSelectors = transactionsAdapter.getSelectors();

export const getTransactions = createSelector(
  getTransactionsState,
  (state: State) => transactionsSelectors.selectAll(state.transactions)
);

export const getFilters = createSelector(
  getTransactionsState,
  (state: State) => state.transactionsFilters
);

export const getFilteredTransactions = createSelector(
  getTransactions, getFilters,
  (transactions: Transaction[], filters: TransactionsFilters) => {
    return transactions
      .filter(item => {
        if (filters.month && item.date.year !== filters.month.year && item.date.month !== filters.month.month) {
          return false;
        }

        if (filters.account && item.account.id !== filters.account.id) {
          return false;
        }

        if (filters.category && item.category.id !== filters.category.id) {
          return false;
        }

        if (filters.contractor && item.contractor.id !== filters.contractor.id) {
          return false;
        }

        return true;
      })
      .sort((a, b) => a.date > b.date ? 1 : -1);
  }
);

export const isTransactionsLoaded = createSelector(
  getTransactionsState,
  (state: State) => state.transactionsLoaded
);

export const getSelectedTransactionId = createSelector(
  getTransactionsState,
  (state: State) => state.selectedTransactionId
);

export const getSelectedTransaction = createSelector(
  getTransactionsState,
  (state: State) => state.transactions.entities[state.selectedTransactionId]
);
