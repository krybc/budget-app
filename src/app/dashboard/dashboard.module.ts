import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedSpinnerModule} from '@shared/spinner';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';

import {BarChartModule, PieChartModule} from '@swimlane/ngx-charts';

import {DashboardDataAccessModule} from '@dashboard-data-access';

import {ShellComponent} from './shell.component';
import {DashboardComponent} from './containers/dashboard/dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { FlowSummaryComponent } from './components/flow-summary/flow-summary.component';
import {CategoriesSummaryComponent} from './components/categories-summary/categories-summary.component';
import { LatestTransactionsTableComponent } from './components/latest-transactions-table/latest-transactions-table.component';
import {MatIconModule} from '@angular/material/icon';

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
    CategoriesSummaryComponent,
    LatestTransactionsTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    DashboardDataAccessModule,
    ...uiModules,
    PieChartModule,
    MatIconModule,
  ],
})
export class DashboardModule { }
