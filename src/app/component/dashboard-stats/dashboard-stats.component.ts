import {Component, Input, OnInit} from '@angular/core';
import {TransactionService} from '../../service/transaction.service';
import {PieChartComponent} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss']
})
export class DashboardStatsComponent implements OnInit {
  @Input() filters: any;
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
