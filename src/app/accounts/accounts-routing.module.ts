import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsListComponent} from './containers/accounts-list/accounts-list.component';
import {AccountAddComponent} from './containers/account-add/account-add.component';
import {AccountEditComponent} from './containers/account-edit/account-edit.component';
import {ShellComponent} from '@accounts/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: AccountsListComponent,
      },
      {
        path: 'add',
        component: AccountAddComponent,
      },
      {
        path: ':id/edit',
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
export class AccountsRoutingModule {
}
