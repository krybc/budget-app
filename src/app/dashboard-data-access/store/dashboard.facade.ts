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
  latestTransactionsParams$ = this.store.pipe(select(DashboardSelectors.getLatestTransactionsParams));
  latestTransactions$ = this.store.pipe(select(DashboardSelectors.getLatestTransactions));
  latestTransactionsLoaded$ = this.store.pipe(select(DashboardSelectors.isLatestTransactionsLoaded));

  constructor(
    private store: Store<fromDashboard.DashboardPartialState>
  ) {
  }

  initLatestTransactions() {
    this.store.dispatch(dashboardActions.initLatestTransactions());
  }
}
