import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from '../core/layout/app-layout/app-layout.component';
import {AuthGuardService} from '../core/guard/auth-guard.service';
import {CategoryAddComponent} from './page/add/add.component';
import {CategoryEditComponent} from './page/edit/edit.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'categories/add',
        component: CategoryAddComponent,
      },
      {
        path: 'categories/:id/edit',
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
export class CategoryRoutingModule { }
