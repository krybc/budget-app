import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';
import { dashboardActions } from './dashboard.actions';


@Injectable()
export class DashboardFacade {
  flowSummary$ = this.store.pipe(select(DashboardSelectors.getFlowSummary));
  flowSummaryLoaded$ = this.store.pipe(select(DashboardSelectors.isFlowSummaryLoaded));
  categoriesSummary$ = this.store.pipe(select(DashboardSelectors.getCategoriesSummary));
  categoriesSummaryLoaded$ = this.store.pipe(select(DashboardSelectors.isCategoriesSummaryLoaded));
  transactionsToSummaryParams$ = this.store.pipe(select(DashboardSelectors.getTransactionsToSummaryParams));
  transactionsToSummary$ = this.store.pipe(select(DashboardSelectors.getLatestTransactions));
  transactionsToSummaryLoaded$ = this.store.pipe(select(DashboardSelectors.isTransactionsToSummaryLoaded));
  latestTransactions$ = this.store.pipe(select(DashboardSelectors.getLatestTransactions));

  constructor(
    private store: Store<fromDashboard.DashboardPartialState>
  ) {
  }

  initTransactionsToSummary() {
    this.store.dispatch(dashboardActions.initTransactionsToSummary());
  }
}
