import * as moment from 'moment';

export class Filters {
  month = moment();
  dateFrom = moment().startOf('month');
  dateTo = moment().endOf('month');
  category: string;
  contractor: string;

  constructor() {

  }
}
