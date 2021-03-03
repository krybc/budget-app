import {createFeatureSelector, createSelector} from '@ngrx/store';
import {State, BUDGET_FEATURE_KEY, BudgetPartialState} from './budget.reducer';

export const getBudgetState = createFeatureSelector<BudgetPartialState, State>(
  BUDGET_FEATURE_KEY
);

export const getBudget = createSelector(
  getBudgetState,
  (state: State) => state.budget
);

export const getBudgetSummary = createSelector(
  getBudgetState,
  (state: State) => {
    return {
      income: state.budget.filter(it => it.parentId === null).reduce((sum, curr) => sum + curr.income, 0),
      expense: state.budget.filter(it => it.parentId === null).reduce((sum, curr) => sum + curr.expense, 0),
    };
  }
);

export const getParams = createSelector(
  getBudgetState,
  (state: State) => state.params
);

export const isBudgetLoaded = createSelector(
  getBudgetState,
  (state: State) => state.budgetLoaded
);
