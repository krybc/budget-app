import {Component, OnInit} from '@angular/core';
import {DashboardFacade} from '@dashboard-data-access';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  flowSummary$ = this.dashboardFacade.flowSummary$;
  flowSummaryLoaded$ = this.dashboardFacade.flowSummaryLoaded$;
  categoriesSummary$ = this.dashboardFacade.categoriesSummary$;
  categoriesSummaryLoaded$ = this.dashboardFacade.categoriesSummaryLoaded$;
  transactionsToSummary$ = this.dashboardFacade.transactionsToSummary$;
  transactionsToSummaryLoaded$ = this.dashboardFacade.transactionsToSummaryLoaded$;
  latestTransactions$ = this.dashboardFacade.latestTransactions$;

  constructor(
    private dashboardFacade: DashboardFacade,
  ) { }

  ngOnInit() {
  }
}
