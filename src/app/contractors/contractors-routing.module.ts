import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContractorsListComponent} from './containers/contractors-list/contractors-list.component';
import {ContractorAddComponent} from './containers/contractor-add/contractor-add.component';
import {ContractorEditComponent} from './containers/contractor-edit/contractor-edit.component';
import {ShellComponent} from '@contractors/shell.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: ContractorsListComponent,
      },
      {
        path: 'add',
        component: ContractorAddComponent,
      },
      {
        path: ':id/edit',
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
export class ContractorsRoutingModule {
}
