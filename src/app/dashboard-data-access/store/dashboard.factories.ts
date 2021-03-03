import {TransactionApiModel} from '@api';
import {DashboardParams, FlowSummaryItem} from './dashboard.models';

export const createFlowSummary = (params: DashboardParams, transactions: TransactionApiModel[]): FlowSummaryItem[] => {
  const result: FlowSummaryItem[] = [];
  const months = Math.ceil(params.dateTo.diff(params.dateFrom, 'months').months);
  for (let i = 0; i < months; i++) {
    const monthStart = params.dateTo.minus({ months: i}).startOf('month');
    const monthEnd = monthStart.endOf('month');

    const income = transactions
      .filter(it => it.date.toMillis() >= monthStart.toMillis() && it.date.toMillis() <= monthEnd.toMillis())
      .reduce((sum, curr) => sum + curr.income, 0);

    const expense = transactions
      .filter(it => it.date.toMillis() >= monthStart.toMillis() && it.date.toMillis() <= monthEnd.toMillis())
      .reduce((sum, curr) => sum + curr.expense, 0);

    result.push({
      name: monthStart.toFormat('yyyy MMMM'),
      series: [
        {
          name: 'Incomes',
          value: income
        },
        {
          name: 'Expenses',
          value: expense,
        },
        {
          name: 'Flow',
          value: income - expense
        }
      ]
    });
  }

  return result;
};
