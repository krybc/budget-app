import {Component, Input, OnInit} from '@angular/core';
import {TransactionService} from '../../../core/service/transaction.service';
import {FiltersState} from '../../../core/state/filters.state';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class DashboardStatsComponent implements OnInit {
  @Input() filters: FiltersState;
  stats: any;
  colors: any;

  constructor(
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {

    this.prepareStats();

  }

  prepareStats() {
    this.transactionService.summary({...this.filters})
      .subscribe((result: any) => {
        this.stats = [
          {
            name: 'Incomes',
            value: result.income
          },
          {
            name: 'Expenses',
            value: result.expense
          }
        ];

        this.colors = [
          {
            name: 'Incomes',
            value: '#53A319'
          },
          {
            name: 'Expenses',
            value: '#C51E1B'
          }
        ];
      });
  }

}
