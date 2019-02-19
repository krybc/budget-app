import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {AuthLoginComponent} from './page/auth-login/auth-login.component';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {DashboardComponent} from './page/dashboard/dashboard.component';
import {AccountListComponent} from './page/account-list/account-list.component';
import {AuthGuardService} from './service/auth-guard.service';
import {AccountEditComponent} from './page/account-edit/account-edit.component';
import {ContractorListComponent} from './page/contractor-list/contractor-list.component';
import {ContractorEditComponent} from './page/contractor-edit/contractor-edit.component';
import {TransactionListComponent} from './page/transaction-list/transaction-list.component';
import {CategoryEditComponent} from './page/category-edit/category-edit.component';
import {BudgetComponent} from './page/budget/budget.component';
import {ContractorAddComponent} from './page/contractor-add/contractor-add.component';
import {AccountAddComponent} from './page/account-add/account-add.component';
import {TransactionAddComponent} from './page/transaction-add/transaction-add.component';
import {TransactionEditComponent} from './page/transaction-edit/transaction-edit.component';
import {CategoryGroupEditComponent} from './page/category-group-edit/category-group-edit.component';
import {CategoryGroupAddComponent} from './page/category-group-add/category-group-add.component';
import {CategoryAddComponent} from './page/category-add/category-add.component';

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
        path: 'login',
        component: AuthLoginComponent
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
        component: DashboardComponent
      },
      {
        path: 'budget',
        component: BudgetComponent
      },
      {
        path: 'accounts',
        component: AccountListComponent,
      },
      {
        path: 'accounts/add',
        component: AccountAddComponent,
      },
      {
        path: 'accounts/:id/edit',
        component: AccountEditComponent
      },
      {
        path: 'contractors',
        component: ContractorListComponent,
      },
      {
        path: 'contractors/add',
        component: ContractorAddComponent,
      },
      {
        path: 'contractors/:id/edit',
        component: ContractorEditComponent,
      },
      {
        path: 'transactions',
        component: TransactionListComponent,
      },
      {
        path: 'transactions/add',
        component: TransactionAddComponent,
      },
      {
        path: 'transactions/:id/edit',
        component: TransactionEditComponent,
      },
      {
        path: 'categories/add',
        component: CategoryAddComponent,
      },
      {
        path: 'categories/:id/edit',
        component: CategoryEditComponent,
      },
      {
        path: 'categoryGroups/add',
        component: CategoryGroupAddComponent,
      },
      {
        path: 'categoryGroups/:id/edit',
        component: CategoryGroupEditComponent,
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
