import { CategoryModel } from '../model/category.model';
import { ContractorModel } from '../model/contractor.model';
import {DateTime} from 'luxon';

export class FiltersState {
  month: DateTime = DateTime.local();
  category: CategoryModel = null;
  contractor: ContractorModel = null;
}
