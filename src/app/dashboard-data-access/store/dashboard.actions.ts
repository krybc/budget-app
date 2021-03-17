import {createAction, props} from '@ngrx/store';
import {Transaction} from '@transactions-data-access';


export const initTransactionsToSummary = createAction('[Dashboard] Init Latest Transactions');
export const loadTransactionsToSummary = createAction('[Dashboard] Load Latest Transactions');
export const loadTransactionsToSummarySuccess = createAction(
  '[Dashboard] Load Latest Transactions Success',
  props<{ transactionsToSummary: Transaction[] }>()
);
export const loadTransactionsToSummaryFailure = createAction(
  '[Dashboard] Load Latest Transactions Failure',
  props<{ error: any }>()
);

export const dashboardActions = {
  initTransactionsToSummary,
  loadTransactionsToSummary,
  loadTransactionsToSummarySuccess,
  loadTransactionsToSummaryFailure,
};
