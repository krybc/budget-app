import {Action, createReducer, on} from '@ngrx/store';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';

import {DateTime} from 'luxon';

import {Transaction, Transactions} from '@transactions-data-access';

import * as DashboardActions from './dashboard.actions';
import {LatestTransactionsParams} from './dashboard.models';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State {
  latestTransactionsParams: LatestTransactionsParams;
  latestTransactions: Transactions;
  latestTransactionsLoaded: boolean;
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
  latestTransactionsParams: initialLatestTransactionsParams,
  latestTransactions: transactionsAdapter.getInitialState(),
  latestTransactionsLoaded: false,
};

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadLatestTransactionsSuccess, (state, {latestTransactions}) => ({
    ...state,
    latestTransactions: transactionsAdapter.setAll(latestTransactions, state.latestTransactions),
    latestTransactionsLoaded: true
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
