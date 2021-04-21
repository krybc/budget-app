import {DateTime} from 'luxon';
import {CategoryType} from '@api';

export interface BudgetCategory {
  id: number;
  type: CategoryType;
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

