import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionAddComponent} from './containers/transaction-add/transaction-add.component';
import {TransactionEditComponent} from './containers/transaction-edit/transaction-edit.component';
import {TransactionListComponent} from './containers/transaction-list/transactions-list.component';
import {ShellComponent} from '@transactions/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: TransactionListComponent,
      },
      {
        path: 'add',
        component: TransactionAddComponent,
      },
      {
        path: ':id/edit',
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
export class TransactionsRoutingModule {
}
