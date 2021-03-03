import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthModule, AuthGuardService} from '@auth';
import {AppLayoutComponent, AuthLayoutComponent} from '@shared/layout';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@auth').then(
            (module) => module.AuthModule
          ),
      }
    ]
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@dashboard/dashboard.module').then(
            (module) => module.DashboardModule
          ),
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('@accounts/accounts.module').then(
            (module) => module.AccountsModule
          ),
      },
      {
        path: 'budget',
        loadChildren: () =>
          import('@budget/budget.module').then(
            (module) => module.BudgetModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('@categories/categories.module').then(
            (module) => module.CategoriesModule
          ),
      },
      {
        path: 'contractors',
        loadChildren: () =>
          import('@contractors/contractors.module').then(
            (module) => module.ContractorsModule
          ),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('@transactions/transactions.module').then(
            (module) => module.TransactionsModule
          ),
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {
}
