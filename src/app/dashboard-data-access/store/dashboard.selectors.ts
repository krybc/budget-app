import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State, DASHBOARD_FEATURE_KEY, DashboardPartialState} from './dashboard.reducer';
import {Transaction, transactionsSelectors} from '@transactions-data-access';
import {createCategoriesSummary, createFlowSummary} from './dashboard.factories';

export const getDashboardState = createFeatureSelector<DashboardPartialState, State>(
  DASHBOARD_FEATURE_KEY
);

export const getLatestTransactionsParams = createSelector(
  getDashboardState,
  (state: State) => state.latestTransactionsParams
);

export const getLatestTransactions = createSelector(
  getDashboardState,
  (state: State) => transactionsSelectors
    .selectAll(state.latestTransactions)
    .sort((a, b) => b.date.toMillis() - a.date.toMillis())
);

export const isLatestTransactionsLoaded = createSelector(
  getDashboardState,
  (state: State) => state.latestTransactionsLoaded
);

export const getFlowSummary = createSelector(
  getLatestTransactionsParams, getLatestTransactions,
  (params, transactions: Transaction[]) => createFlowSummary(params, transactions)
);

export const isFlowSummaryLoaded = createSelector(
  getDashboardState,
  (state: State) => state.latestTransactionsLoaded
);

export const getCategoriesSummary = createSelector(
  getLatestTransactionsParams, getLatestTransactions,
  (params, transactions) => createCategoriesSummary(params, transactions)
);

export const isCategoriesSummaryLoaded = createSelector(
  getDashboardState,
  (state: State) => state.latestTransactionsLoaded
);


