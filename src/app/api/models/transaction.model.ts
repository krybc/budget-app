import {DateTime} from 'luxon';

export interface TransactionApiModel {
  id?: number;
  categoryId: number;
  accountId: number;
  contractorId: number;
  date: DateTime;
  income: number;
  expense: number;
  description: string;
}

export interface TransactionsQueryParams {
  dateFrom?: DateTime;
  dateTo?: DateTime;
  account?: number;
  category?: number;
  contractor?: number;
}
