import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State, DASHBOARD_FEATURE_KEY, DashboardPartialState} from './dashboard.reducer';
import {Transaction, transactionsSelectors} from '@transactions-data-access';
import {createCategoriesSummary, createFlowSummary} from './dashboard.factories';

export const getDashboardState = createFeatureSelector<DashboardPartialState, State>(
  DASHBOARD_FEATURE_KEY
);

export const getTransactionsToSummaryParams = createSelector(
  getDashboardState,
  (state: State) => state.transactionsToSummaryParams
);

export const getTransactionsToSummary = createSelector(
  getDashboardState,
  (state: State) => transactionsSelectors.selectAll(state.transactionsToSummary)
);

export const getLatestTransactions = createSelector(
  getTransactionsToSummary,
  (state: Transaction[]) => state
    .sort((a, b) => b.date.toMillis() - a.date.toMillis())
    .slice(0, 10)
);

export const isTransactionsToSummaryLoaded = createSelector(
  getDashboardState,
  (state: State) => state.transactionsToSummaryLoaded
);

export const getFlowSummary = createSelector(
  getTransactionsToSummaryParams, getTransactionsToSummary,
  (params, transactions: Transaction[]) => createFlowSummary(params, transactions)
);

export const isFlowSummaryLoaded = createSelector(
  getDashboardState,
  (state: State) => state.transactionsToSummaryLoaded
);

export const getCategoriesSummary = createSelector(
  getTransactionsToSummaryParams, getTransactionsToSummary,
  (params, transactions) => createCategoriesSummary(params, transactions)
);

export const isCategoriesSummaryLoaded = createSelector(
  getDashboardState,
  (state: State) => state.transactionsToSummaryLoaded
);


