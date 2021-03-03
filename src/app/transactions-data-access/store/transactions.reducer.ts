import {Transactions, Transaction, TransactionsFilters} from './transactions.models';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {DateTime} from 'luxon';
import {Action, createReducer, on} from '@ngrx/store';
import {TransactionsActions} from './transactions.actions';


export const TRANSACTIONS_FEATURE_KEY = 'transactions';

export interface State {
  transactions: Transactions;
  transactionsLoaded: boolean;
  selectedTransactionId: number;
  transactionsFilters: TransactionsFilters;
}

export interface TransactionsPartialState {
  readonly [TRANSACTIONS_FEATURE_KEY]: State;
}

export const transactionsAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();

const initialTransactionsFilters: TransactionsFilters = {
  month: DateTime.local().startOf('month'),
  category: null,
  contractor: null,
  account: null
};

export const initialState: State = {
  transactions: transactionsAdapter.getInitialState(),
  transactionsLoaded: false,
  selectedTransactionId: null,
  transactionsFilters: initialTransactionsFilters
};

const transactionsReducer = createReducer(
  initialState,
  on(TransactionsActions.loadTransactionsSuccess, (state, {transactions}) => ({
    ...state,
    transactions: transactionsAdapter.setAll(transactions, state.transactions),
    transactionsLoaded: true
  })),
  on(TransactionsActions.setFilters, (state, {filters}) => ({
    ...state,
    transactionsFilters: { ...state.transactionsFilters, ...filters }
  })),
  on(TransactionsActions.selectTransaction, (state, {id}) => ({
    ...state,
    selectedTransactionId: id
  })),
  on(TransactionsActions.createTransactionSuccess, (state, {transaction}) => ({
    ...state,
    transactions: transactionsAdapter.addOne(transaction, state.transactions)
  })),
  on(TransactionsActions.updateTransactionSuccess, (state, {transaction}) => ({
    ...state,
    transactions: transactionsAdapter.setOne(transaction, state.transactions)
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return transactionsReducer(state, action);
}
