import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BudgetComponent} from './containers/budget/budget.component';
import {BudgetShellComponent} from '@budget/shell.component';

const routes: Routes = [
  {
    path: '',
    component: BudgetShellComponent,
    children: [
      {
        path: '',
        component: BudgetComponent,
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class BudgetRoutingModule {
}
