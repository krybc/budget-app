import {createAction, props} from '@ngrx/store';
import {Transaction, TransactionsFilters} from './transactions.models';

const initTransactions = createAction('[Transactions] Init Transactions');
const loadTransactions = createAction('[Transactions] Load Transactions');
const loadTransactionsSuccess = createAction(
  '[Transactions] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);
const loadTransactionsFailure = createAction(
  '[Transactions] Load Transactions Failure',
  props<{ error: any }>()
);
const selectTransaction = createAction(
  '[Transactions] Select Transaction',
  props<{ id: number }>()
);

const createTransaction = createAction(
  '[Transactions] Create Transaction',
  props<{ transaction: Transaction }>()
);
const createTransactionSuccess = createAction(
  '[Transactions] Create Transaction Success',
  props<{ transaction: Transaction }>()
);
const createTransactionFailure = createAction(
  '[Transactions] Create Transaction Failure',
  props<{ error: any }>()
);

const updateTransaction = createAction(
  '[Transactions] Update Transaction',
  props<{ transaction: Transaction }>()
);
const updateTransactionSuccess = createAction(
  '[Transactions] Update Transaction Success',
  props<{ transaction: Transaction }>()
);
const updateTransactionFailure = createAction(
  '[Transactions] Update Transaction Failure',
  props<{ error: any }>()
);

const deleteTransaction = createAction(
  '[Transactions] Delete Transaction',
  props<{ transaction: Transaction }>()
);
const deleteTransactionSuccess = createAction(
  '[Transactions] Delete Transaction Success',
  props<{ transaction: Transaction }>()
);
const deleteTransactionFailure = createAction(
  '[Transactions] Delete Transaction Failure',
  props<{ error: any }>()
);

const setFilters = createAction(
  '[Transactions] Set Filters',
  props<{ filters: TransactionsFilters }>()
);

export const TransactionsActions = {
  initTransactions,
  loadTransactions,
  loadTransactionsSuccess,
  loadTransactionsFailure,
  selectTransaction,
  createTransaction,
  createTransactionSuccess,
  createTransactionFailure,
  updateTransaction,
  updateTransactionSuccess,
  updateTransactionFailure,
  deleteTransaction,
  deleteTransactionSuccess,
  deleteTransactionFailure,
  setFilters
};
