import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContractorAddComponent} from './page/add/add.component';
import {ContractorEditComponent} from './page/edit/edit.component';
import {ContractorListComponent} from './page/list/list.component';
import {ContractorRoutingModule} from './contractor-routing.module';

@NgModule({
  declarations: [
    ContractorAddComponent,
    ContractorEditComponent,
    ContractorListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ContractorRoutingModule
  ],
  exports: [
    RouterModule,
  ],
})
export class ContractorModule { }
