import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {BarChartModule} from '@swimlane/ngx-charts';

import {DashboardComponent} from './containers/dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { FlowSummaryComponent } from './components/flow-summary/flow-summary.component';
import {DashboardDataAccessModule} from '@dashboard-data-access';
import {ShellComponent} from './shell.component';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedSpinnerModule} from '@shared/spinner';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

const uiModules = [
  BarChartModule,
  FlexLayoutModule,
  MatCardModule,
  MatTableModule,
  MatToolbarModule,
  SharedSpinnerModule
];

@NgModule({
  declarations: [
    ShellComponent,
    DashboardComponent,
    FlowSummaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DashboardDataAccessModule,
    ...uiModules,
  ],
})
export class DashboardModule { }
