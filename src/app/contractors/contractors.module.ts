import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContractorsListComponent} from './containers/contractors-list/contractors-list.component';
import {ContractorAddComponent} from './containers/contractor-add/contractor-add.component';
import {ContractorEditComponent} from './containers/contractor-edit/contractor-edit.component';
import {ContractorsRoutingModule} from './contractors-routing.module';
import { ContractorFormComponent } from './components/contractor-form/contractor-form.component';
import {ShellComponent} from './shell.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
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
    ContractorAddComponent,
    ContractorEditComponent,
    ContractorsListComponent,
    ContractorFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContractorsRoutingModule,
    ...uiModules,
  ],
  exports: [
    RouterModule,
  ],
})
export class ContractorsModule { }
