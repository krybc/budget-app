import {EntityState} from '@ngrx/entity';
import {CategoryType} from '@api';

export interface Categories extends EntityState<Category> {
}

export interface Category {
  id?: number;
  parent: Category;
  name: string;
  type: CategoryType;
  sequence: number;
  children?: Category[];
}
