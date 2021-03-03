import {DateTime} from 'luxon';

export interface DashboardParams {
  dateFrom: DateTime;
  dateTo: DateTime;
}

export interface FlowSummaryItem {
  name: string;
  series: FlowSummaryItemSeries[];
}

export interface FlowSummaryItemSeries {
  name: string;
  value: number;
}
