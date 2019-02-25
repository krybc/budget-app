import {NgModule} from '@angular/core';
import {BudgetPageComponent} from './page/budget/budget.component';
import {BudgetRoutingModule} from './budget-routing.module';
import {RouterModule} from '@angular/router';
import {BudgetFilterComponent} from './component/filter/filter.component';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    BudgetPageComponent,
    BudgetFilterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BudgetRoutingModule
  ],
  exports: [
    RouterModule,
  ],
})
export class BudgetModule { }
