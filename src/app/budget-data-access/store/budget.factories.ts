import {TransactionApiModel} from '@api';
import {BudgetCategory} from './budget.models';
import {Category} from '@categories-data-access';

const createBudget = (apiCategories: Category[], transactions: TransactionApiModel[]): BudgetCategory[] => {
  const categories = apiCategories.map(item => ({...item, income: 0, expense: 0, children: []} as BudgetCategory));
  const budget = [];

  categories
    .filter(item => item.parentId === null)
    .forEach(group => {

      const children = categories
        .filter(it => it.parentId === group.id)
        .map(it => {
          it.income = transactions.filter(t => t.categoryId === it.id).reduce((sum, curr) => sum + curr.income, 0);
          it.expense = transactions.filter(t => t.categoryId === it.id).reduce((sum, curr) => sum + curr.expense, 0);
          return it;
        });

      group.income = children.reduce((sum, curr) => sum + curr.income, 0);
      group.expense = children.reduce((sum, curr) => sum + curr.expense, 0);
      budget.push(group);

      children.forEach(it => {
        budget.push(it);
      });
    });

  return budget;
};

export const BudgetFactories = {
  createBudget,
};
