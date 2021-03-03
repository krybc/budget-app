import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as fromBudget from './budget.reducer';
import * as BudgetSelectors from './budget.selectors';
import {BudgetActions} from './budget.actions';
import {BudgetParams} from './budget.models';


@Injectable()
export class BudgetFacade {
  budget$ = this.store.pipe(select(BudgetSelectors.getBudget));
  budgetSummary$ = this.store.pipe(select(BudgetSelectors.getBudgetSummary));
  budgetLoaded$ = this.store.pipe(select(BudgetSelectors.isBudgetLoaded));
  params$ = this.store.pipe(select(BudgetSelectors.getParams));

  constructor(
    private store: Store<fromBudget.BudgetPartialState>
  ) {
  }

  initBudget() {
    this.store.dispatch(BudgetActions.initBudget());
  }

  setParams(params: BudgetParams) {
    this.store.dispatch(BudgetActions.setParams({params}));
  }
}
