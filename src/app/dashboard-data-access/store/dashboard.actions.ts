import {createAction, props} from '@ngrx/store';
import {Transaction} from '@transactions-data-access';


export const initLatestTransactions = createAction('[Dashboard] Init Latest Transactions');
export const loadLatestTransactions = createAction('[Dashboard] Load Latest Transactions');
export const loadLatestTransactionsSuccess = createAction(
  '[Dashboard] Load Latest Transactions Success',
  props<{ latestTransactions: Transaction[] }>()
);
export const loadLatestTransactionsFailure = createAction(
  '[Dashboard] Load Latest Transactions Failure',
  props<{ error: any }>()
);

export const dashboardActions = {
  initLatestTransactions,
  loadLatestTransactions,
  loadLatestTransactionsSuccess,
  loadLatestTransactionsFailure
};
