import {DashboardParams, FlowSummaryItem} from './dashboard.models';
import {DateTime} from 'luxon';
import {Action, createReducer, on} from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';
import {Transaction, Transactions} from '@transactions-data-access';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';


export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State {
  dashboardParams: DashboardParams;
  flowSummary: FlowSummaryItem[];
  flowSummaryLoaded: boolean;
  latestTransactions: Transactions;
  latestTransactionsLoaded: boolean;
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const transactionsAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();


const initialDashboardParams: DashboardParams = {
  dateFrom: DateTime.local().minus({ months: 2 }).startOf('month'),
  dateTo: DateTime.local().endOf('month'),
};

export const initialState: State = {
  dashboardParams: initialDashboardParams,
  flowSummary: [],
  flowSummaryLoaded: false,
  latestTransactions: transactionsAdapter.getInitialState(),
  latestTransactionsLoaded: false,
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadFlowSummarySuccess, (state, {flowSummary}) => ({
    ...state,
    flowSummary,
    flowSummaryLoaded: true
  })),
  on(DashboardActions.loadLatestTransactionsSuccess, (state, {latestTransactions}) => ({
    ...state,
    latestTransactions: transactionsAdapter.setAll(latestTransactions, state.latestTransactions),
    latestTransactionsLoaded: true
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
