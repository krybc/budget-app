import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ShellComponent} from '@categories/shell.component';

import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoryAddComponent} from './containers/category-add/category-add.component';
import {CategoryEditComponent} from './containers/category-edit/category-edit.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {SharedUiModule} from '@shared/ui';
import {SharedSpinnerModule} from '@shared/spinner';

const uiModules = [
  FlexLayoutModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  SharedSpinnerModule,
  SharedUiModule,
];

@NgModule({
  declarations: [
    ShellComponent,
    CategoryAddComponent,
    CategoryEditComponent,
    CategoryFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoriesRoutingModule,
    ...uiModules,
  ]
})
export class CategoriesModule { }
