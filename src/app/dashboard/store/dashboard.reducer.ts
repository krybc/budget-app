import {DateRange} from '@angular/material/datepicker';
import {DateTime} from 'luxon';
import {Action, createReducer} from '@ngrx/store';

import {DashboardFilters} from './dashboard.models';


export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State {
  filters: DashboardFilters;
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const initialState: State = {
  filters: {
    dateRange: new DateRange<DateTime>(DateTime.local().startOf('month'), DateTime.local().endOf('month')),
  }
};

const dashboardReducer = createReducer(
  initialState,
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
