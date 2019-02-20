import {Injectable} from '@angular/core';
import {Store} from './store';
import {FiltersState} from '../state/filters.state';
import * as moment from 'moment';
import { CategoryModel } from '../model/category.model';
import { ContractorModel } from '../model/contractor.model';

@Injectable()
export class FiltersStore extends Store<FiltersState> {
  constructor () {
    super(new FiltersState());
  }

  setMonth(month: moment.Moment) {
    this.setState({
      ...this.state,
        ...{month}
    });
  }

  setCategory(category: CategoryModel) {
    this.setState({
      ...this.state,
      ...{category}
    });
  }

  setContractor(contractor: ContractorModel): void {
    this.setState({
      ...this.state,
      ...{contractor}
    });
  }
}
