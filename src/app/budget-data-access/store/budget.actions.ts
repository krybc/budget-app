import {createAction, props} from '@ngrx/store';
import {BudgetParams, BudgetCategory} from './budget.models';

const initBudget = createAction('[Budget] Init Budget');
const loadBudget = createAction('[Budget] Load Budget');
const loadBudgetSuccess = createAction(
  '[Budget] Load Budget Success',
  props<{ budget: BudgetCategory[] }>()
);
const loadBudgetFailure = createAction(
  '[Budget] Load Budget Failure',
  props<{ error: any }>()
);

const setParams = createAction(
  '[Budget] Set Params',
  props<{ params: BudgetParams }>()
);

export const BudgetActions = {
  initBudget,
  loadBudget,
  setParams,
  loadBudgetSuccess,
  loadBudgetFailure
};
