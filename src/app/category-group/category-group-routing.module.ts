import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from '../core/layout/app-layout/app-layout.component';
import {AuthGuardService} from '../core/guard/auth-guard.service';
import {CategoryGroupAddComponent} from './page/add/add.component';
import {CategoryGroupEditComponent} from './page/edit/edit.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'categoryGroups/add',
        component: CategoryGroupAddComponent,
      },
      {
        path: 'categoryGroups/:id/edit',
        component: CategoryGroupEditComponent,
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
export class CategoryGroupRoutingModule { }
