import {Component, OnInit} from '@angular/core';
import {DashboardFacade} from '../../../dashboard-data-access/store/dashboard.facade';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  flowSummary$ = this.dashboardFacade.flowSummary$;
  flowSummaryLoaded$ = this.dashboardFacade.flowSummaryLoaded$;
  latestTransactions$ = this.dashboardFacade.latestTransactions$;
  latestTransactionsLoaded$ = this.dashboardFacade.latestTransactionsLoaded$;

  constructor(
    private dashboardFacade: DashboardFacade,
  ) { }

  ngOnInit() {
  }
}
