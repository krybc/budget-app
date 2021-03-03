import {DateTime} from 'luxon';

export interface BudgetCategory {
  id: number;
  parentId: number;
  name: string;
  income: number;
  expense: number;
  order: number;
  children?: BudgetCategory[];
}

export interface BudgetParams {
  month: DateTime;
}

export interface BudgetSummary {
  income: number;
  expense: number;
}

