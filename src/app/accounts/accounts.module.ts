import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ShellComponent} from './shell.component';

import {AccountAddComponent} from './containers/account-add/account-add.component';
import {AccountEditComponent} from './containers/account-edit/account-edit.component';
import {AccountsListComponent} from './containers/accounts-list/accounts-list.component';
import {AccountsRoutingModule} from './accounts-routing.module';
import { AccountFormComponent } from './components/account-form/account-form.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {SharedSpinnerModule} from '@shared/spinner';
import {SharedUiModule} from '@shared/ui';

const uiModules = [
  FlexLayoutModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatTableModule,
  SharedUiModule,
  SharedSpinnerModule,
];

@NgModule({
  declarations: [
    ShellComponent,
    AccountAddComponent,
    AccountEditComponent,
    AccountsListComponent,
    AccountFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AccountsRoutingModule,
    ...uiModules,
  ],
})
export class AccountsModule { }
