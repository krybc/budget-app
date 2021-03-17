import {Component, Input, OnInit} from '@angular/core';
import {CategoriesSummaryItem} from '@dashboard-data-access';

@Component({
  selector: 'app-categories-summary',
  templateUrl: './categories-summary.component.html',
  styleUrls: ['./categories-summary.component.scss']
})
export class CategoriesSummaryComponent implements OnInit {
  @Input() summary: CategoriesSummaryItem[];

  constructor() { }

  ngOnInit(): void {
  }
}
