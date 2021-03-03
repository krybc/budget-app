import {EntityState} from '@ngrx/entity';

export interface Contractors extends EntityState<Contractor> {
}

export interface Contractor {
  id?: number;
  name: string;
  street: string;
  city: string;
}
