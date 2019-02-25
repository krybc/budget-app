import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryAddComponent} from './page/add/add.component';
import {CategoryEditComponent} from './page/edit/edit.component';

@NgModule({
  declarations: [
    CategoryAddComponent,
    CategoryEditComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CategoryRoutingModule
  ],
  exports: [
    RouterModule,
  ],
})
export class CategoryModule { }
