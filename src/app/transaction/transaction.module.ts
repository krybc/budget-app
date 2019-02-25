import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransactionAddComponent} from './page/add/add.component';
import {TransactionRoutingModule} from './transaction-routing.module';
import {TransactionEditComponent} from './page/edit/edit.component';
import {TransactionListComponent} from './page/list/list.component';
import {TransactionFilterComponent} from './component/filter/filter.component';

@NgModule({
  declarations: [
    TransactionAddComponent,
    TransactionEditComponent,
    TransactionListComponent,
    TransactionFilterComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TransactionRoutingModule
  ],
  exports: [
    RouterModule,
  ],
})
export class TransactionModule { }
