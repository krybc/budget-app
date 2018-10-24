import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../service/transaction.service';
import {FiltersState} from '../../state/filters.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  latestTransactions: any[] = null;
  filters: FiltersState;

  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    this.filters = new FiltersState();
    this.prepareLatestTransactions(this.filters);
  }

  prepareLatestTransactions(filters: FiltersState) {
    this.transactionService.list(filters, null, 10)
      .subscribe((result) => {
        this.latestTransactions = result;
      });
  }

}
