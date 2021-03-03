import {EntityState} from '@ngrx/entity';
import {CategoryType} from '@api';

export interface Categories extends EntityState<Category> {
}

export interface Category {
  id?: number;
  parentId: number;
  name: string;
  type: CategoryType;
  order: number;
  children?: Category[];
}
