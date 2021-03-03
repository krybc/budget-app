import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromDashboard from './store/dashboard.reducer';
import {EffectsModule} from '@ngrx/effects';
import {DashboardEffects} from './store/dashboard.effects';
import {DashboardFacade} from './store/dashboard.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromDashboard.DASHBOARD_FEATURE_KEY,
      fromDashboard.reducer
    ),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  providers: [
    DashboardFacade,
  ]
})
export class DashboardDataAccessModule { }
