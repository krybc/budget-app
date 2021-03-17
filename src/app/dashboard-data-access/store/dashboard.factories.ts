import {CategoriesSummaryItem, LatestTransactionsParams, FlowSummaryItem} from './dashboard.models';
import {Transaction} from '@transactions-data-access';

export const createFlowSummary = (params: LatestTransactionsParams, transactions: Transaction[]): FlowSummaryItem[] => {
  const result: FlowSummaryItem[] = [];

  transactions.forEach(it => {
    const monthStart = it.date.startOf('month');

    const resultItem = result.find(res => res.id.equals(monthStart));
    if (resultItem) {
      resultItem.series[0].value += it.income;
      resultItem.series[1].value += it.expense;
      resultItem.series[2].value += it.income - it.expense;
    } else {
      result.push({
        id: monthStart,
        name: monthStart.toFormat('yyyy MMMM'),
        series: [
          {
            name: 'Incomes',
            value: it.income
          },
          {
            name: 'Expenses',
            value: it.expense,
          },
          {
            name: 'Flow',
            value: it.income - it.expense
          }
        ]
      });
    }
  });

  return result;
};

export const createCategoriesSummary = (params: LatestTransactionsParams, transactions: Transaction[]): CategoriesSummaryItem[] => {
  const result: CategoriesSummaryItem[] = [];

  transactions
    .filter(it => it.expense > 0)
    .forEach(it => {
    const monthStart = it.date.startOf('month');

    const resultItem = result.find(res => res.id.equals(monthStart));
    if (resultItem) {
      const resultCategory = resultItem.series.find(cat => cat.id === it.category.id);
      if (resultCategory) {
        resultCategory.value = it.expense;
      } else {
        resultItem.series.push({
          id: it.category.id,
          name: it.category.name,
          value: it.expense
        });
      }
    } else {
      result.push({
        id: monthStart,
        name: monthStart.toFormat('yyyy MMMM'),
        series: [
          {
            id: it.category.id,
            name: it.category.name,
            value: it.expense
          },
        ]
      });
    }
  });

  return result;
};
