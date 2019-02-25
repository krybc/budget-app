import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from '../core/layout/app-layout/app-layout.component';
import {AuthGuardService} from '../core/guard/auth-guard.service';
import {AccountListComponent} from './page/list/list.component';
import {AccountAddComponent} from './page/add/add.component';
import {AccountEditComponent} from './page/edit/edit.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
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
export class AccountRoutingModule { }
