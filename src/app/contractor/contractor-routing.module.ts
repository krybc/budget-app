import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from '../core/layout/app-layout/app-layout.component';
import {AuthGuardService} from '../core/guard/auth-guard.service';
import {ContractorListComponent} from './page/list/list.component';
import {ContractorAddComponent} from './page/add/add.component';
import {ContractorEditComponent} from './page/edit/edit.component';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'contractors',
        component: ContractorListComponent,
      },
      {
        path: 'contractors/add',
        component: ContractorAddComponent,
      },
      {
        path: 'contractors/:id/edit',
        component: ContractorEditComponent,
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
export class ContractorRoutingModule { }
