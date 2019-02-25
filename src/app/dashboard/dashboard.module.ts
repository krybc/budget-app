import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardPageComponent} from './page/dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardStatsComponent} from './component/stats/stats.component';

@NgModule({
  declarations: [
    DashboardStatsComponent,
    DashboardPageComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DashboardRoutingModule
  ],
  exports: [
    RouterModule,
  ],
})
export class DashboardModule { }
