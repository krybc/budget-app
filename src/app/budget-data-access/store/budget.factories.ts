import {TransactionApiModel} from '@api';
import {BudgetCategory} from './budget.models';
import {Category} from '@categories-data-access';

const createBudget = (inputCategories: Category[], transactions: TransactionApiModel[]): BudgetCategory[] => {
  const categories = inputCategories.map(item => ({id: item.id, name: item.name, type: item.type, parentId: item.parent ? item.parent.id : null, sequence: item.sequence, income: 0, expense: 0, children: []} as BudgetCategory));
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

      children.forEach(it => {
        group.children.push(it);
      });

      budget.push(group);
    });

  return budget;
};

export const BudgetFactories = {
  createBudget,
};
