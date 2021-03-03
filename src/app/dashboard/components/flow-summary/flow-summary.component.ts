import {Component, Input, OnInit} from '@angular/core';
import {FlowSummaryItem} from '@dashboard-data-access';

@Component({
  selector: 'app-flow-summary',
  templateUrl: './flow-summary.component.html',
  styleUrls: ['./flow-summary.component.scss']
})
export class FlowSummaryComponent implements OnInit {
  @Input() summary: FlowSummaryItem[];
  view: any[] = [700, 400];

  // options
  showXAxis = true;
  colorScheme = {
    domain: ['#7cb342', '#e53935', '#ffd740']
  };

  constructor() { }

  ngOnInit(): void {
  }

}
