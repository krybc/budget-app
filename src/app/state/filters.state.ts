import * as moment from 'moment';
import { CategoryModel } from '../model/category.model';
import { ContractorModel } from '../model/contractor.model';
import { Moment } from 'moment';

export class FiltersState {
  month: Moment = moment(Date.now());
  category: CategoryModel = null;
  contractor: ContractorModel = null;
}
