import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryAddComponent} from './containers/category-add/category-add.component';
import {CategoryEditComponent} from './containers/category-edit/category-edit.component';
import {ShellComponent} from '@categories/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'add',
        component: CategoryAddComponent,
      },
      {
        path: ':id/edit',
        component: CategoryEditComponent,
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
export class CategoriesRoutingModule {
}
