import {createAction, props} from '@ngrx/store';
import {FlowSummaryItem} from './dashboard.models';
import {Transaction} from '@transactions-data-access';

export const loadFlowSummary = createAction('[Dashboard] Load Flow Summary');
export const loadFlowSummarySuccess = createAction(
  '[Dashboard] Load Flow Summary Success',
  props<{ flowSummary: FlowSummaryItem[] }>()
);
export const loadFlowSummaryFailure = createAction(
  '[Dashboard] Load Flow Summary Failure',
  props<{ error: any }>()
);

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
  loadFlowSummary,
  loadFlowSummarySuccess,
  loadFlowSummaryFailure,
  loadLatestTransactions,
  loadLatestTransactionsSuccess,
  loadLatestTransactionsFailure
};
