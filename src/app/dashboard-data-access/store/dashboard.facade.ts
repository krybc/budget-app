import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';
import { dashboardActions } from './dashboard.actions';


@Injectable()
export class DashboardFacade {
  flowSummary$ = this.store.pipe(select(DashboardSelectors.getFlowSummary));
  flowSummaryLoaded$ = this.store.pipe(select(DashboardSelectors.isFlowSummaryLoaded));
  params$ = this.store.pipe(select(DashboardSelectors.getParams));
  latestTransactions$ = this.store.pipe(select(DashboardSelectors.getLatestTransactions));
  latestTransactionsLoaded$ = this.store.pipe(select(DashboardSelectors.isLatestTransactionsLoaded));

  constructor(
    private store: Store<fromDashboard.DashboardPartialState>
  ) {
  }

  loadFlowSummary() {
    this.store.dispatch(dashboardActions.loadFlowSummary());
  }

  loadLatestTransactions() {
    this.store.dispatch(dashboardActions.loadLatestTransactions());
  }
}
