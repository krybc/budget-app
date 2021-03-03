import {BudgetParams, BudgetCategory} from './budget.models';
import {DateTime} from 'luxon';
import {Action, createReducer, on} from '@ngrx/store';
import {BudgetActions} from './budget.actions';


export const BUDGET_FEATURE_KEY = 'budget';

export interface State {
  params: BudgetParams;
  budget: BudgetCategory[];
  budgetLoaded: boolean;
}

export interface BudgetPartialState {
  readonly [BUDGET_FEATURE_KEY]: State;
}

const initialBudgetParams: BudgetParams = {
  month: DateTime.local().startOf('month'),
};

export const initialState: State = {
  params: initialBudgetParams,
  budget: [],
  budgetLoaded: false,
};

const budgetReducer = createReducer(
  initialState,
  on(BudgetActions.loadBudgetSuccess, (state, {budget}) => ({
    ...state,
    budget,
    budgetLoaded: true
  })),
  on(BudgetActions.setParams, (state, {params}) => ({
    ...state,
    params,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return budgetReducer(state, action);
}
