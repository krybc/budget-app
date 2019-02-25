import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategoryGroupRoutingModule} from './category-group-routing.module';
import {CategoryGroupAddComponent} from './page/add/add.component';
import {CategoryGroupEditComponent} from './page/edit/edit.component';

@NgModule({
  declarations: [
    CategoryGroupAddComponent,
    CategoryGroupEditComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CategoryGroupRoutingModule
  ],
  exports: [
    RouterModule,
  ],
})
export class CategoryGroupModule { }
