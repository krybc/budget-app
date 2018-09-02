import { Injectable } from '@angular/core';
import {Filters} from '../model/state/filters';

@Injectable({
  providedIn: 'root'
})
export class FiltersState {
  filters: Filters = new Filters();

  constructor() {

  }
}
