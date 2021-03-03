import {DateTime} from 'luxon';
import {DateRange} from '@angular/material/datepicker';

export interface DashboardFilters {
  dateRange: DateRange<DateTime>;
}
