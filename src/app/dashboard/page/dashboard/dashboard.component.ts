import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../../core/service/transaction.service';
import {FiltersState} from '../../../core/state/filters.state';
import {TransactionModel} from '../../../core/model/transaction.model';

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardPageComponent implements OnInit {
  latestTransactions: TransactionModel[] = null;
  filters: FiltersState;
  public isLoading = true;

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
        this.isLoading = false;
      });
  }

}
