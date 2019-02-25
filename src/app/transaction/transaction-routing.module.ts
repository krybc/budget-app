import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from '../core/layout/app-layout/app-layout.component';
import {AuthGuardService} from '../core/guard/auth-guard.service';
import {TransactionListComponent} from './page/list/list.component';
import {TransactionAddComponent} from './page/add/add.component';
import {TransactionEditComponent} from './page/edit/edit.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
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
export class TransactionRoutingModule { }
