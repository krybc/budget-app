import {DateTime} from 'luxon';

export interface LatestTransactionsParams {
  dateFrom: DateTime;
  dateTo: DateTime;
}

export interface FlowSummaryItem {
  id: DateTime;
  name: string;
  series: FlowSummaryItemSeries[];
}

export interface FlowSummaryItemSeries {
  name: string;
  value: number;
}

export interface CategoriesSummaryItem {
  id: DateTime;
  name: string;
  series: CategoriesSummaryItemSeries[];
}

export interface CategoriesSummaryItemSeries {
  id: number;
  name: string;
  value: number;
}
