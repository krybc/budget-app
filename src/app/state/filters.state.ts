import * as moment from 'moment';
import {Category} from '../model/category.model';
import {Contractor} from '../model/contractor.model';
import {Moment} from 'moment';

export class FiltersState {
  month: Moment = moment(Date.now());
  category: Category = null;
  contractor: Contractor = null;
}
