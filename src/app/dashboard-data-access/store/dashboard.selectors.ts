import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State, DASHBOARD_FEATURE_KEY, DashboardPartialState} from './dashboard.reducer';
import {transactionsSelectors} from '@transactions-data-access';

export const getDashboardState = createFeatureSelector<DashboardPartialState, State>(
  DASHBOARD_FEATURE_KEY
);

export const getFlowSummary = createSelector(
  getDashboardState,
  (state: State) => state.flowSummary
);

export const getParams = createSelector(
  getDashboardState,
  (state: State) => state.dashboardParams
);

export const isFlowSummaryLoaded = createSelector(
  getDashboardState,
  (state: State) => state.flowSummaryLoaded
);

export const getLatestTransactions = createSelector(
  getDashboardState,
  (state: State) => transactionsSelectors.selectAll(state.latestTransactions)
);

export const isLatestTransactionsLoaded = createSelector(
  getDashboardState,
  (state: State) => state.latestTransactionsLoaded
);
