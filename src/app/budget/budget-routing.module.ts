import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BudgetPageComponent} from './page/budget/budget.component';
import {AppLayoutComponent} from '../core/layout/app-layout/app-layout.component';
import {AuthGuardService} from '../core/guard/auth-guard.service';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'budget',
        component: BudgetPageComponent,
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
export class BudgetRoutingModule { }
