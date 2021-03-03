import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BudgetFacade} from './store/budget.facade';
import {StoreModule} from '@ngrx/store';
import * as fromBudget from './store/budget.reducer';
import {EffectsModule} from '@ngrx/effects';
import {BudgetEffects} from './store/budget.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromBudget.BUDGET_FEATURE_KEY,
      fromBudget.reducer
    ),
    EffectsModule.forFeature([BudgetEffects]),
  ],
  providers: [
    BudgetFacade,
  ]
})
export class BudgetDataAccessModule { }
