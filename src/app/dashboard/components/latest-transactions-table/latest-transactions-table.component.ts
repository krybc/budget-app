import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '@transactions-data-access';

@Component({
  selector: 'app-latest-transactions-table',
  templateUrl: './latest-transactions-table.component.html',
  styleUrls: ['./latest-transactions-table.component.scss']
})
export class LatestTransactionsTableComponent implements OnInit {
  @Input() transactions: Transaction[];

  constructor() { }

  ngOnInit(): void {
  }

}
