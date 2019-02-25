import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccountAddComponent} from './page/add/add.component';
import {AccountEditComponent} from './page/edit/edit.component';
import {AccountListComponent} from './page/list/list.component';
import {AccountRoutingModule} from './account-routing.module';

@NgModule({
  declarations: [
    AccountAddComponent,
    AccountEditComponent,
    AccountListComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AccountRoutingModule
  ],
  exports: [
    RouterModule,
  ],
})
export class AccountModule { }
