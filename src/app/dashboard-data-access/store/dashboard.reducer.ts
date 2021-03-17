import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

import {DateTime} from 'luxon';

import {Transaction, Transactions} from '@transactions-data-access';

import * as DashboardActions from './dashboard.actions';
import {LatestTransactionsParams} from './dashboard.models';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State {
  transactionsToSummaryParams: LatestTransactionsParams;
  transactionsToSummary: Transactions;
  transactionsToSummaryLoaded: boolean;
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const transactionsAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>();

const initialLatestTransactionsParams: LatestTransactionsParams = {
  dateFrom: DateTime.local().minus({ months: 2 }).startOf('month'),
  dateTo: DateTime.local().endOf('month'),
};

export const initialState: State = {
  transactionsToSummaryParams: initialLatestTransactionsParams,
  transactionsToSummary: transactionsAdapter.getInitialState(),
  transactionsToSummaryLoaded: false,
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadTransactionsToSummarySuccess, (state, {transactionsToSummary}) => ({
    ...state,
    transactionsToSummary: transactionsAdapter.setAll(transactionsToSummary, state.transactionsToSummary),
    transactionsToSummaryLoaded: true
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
