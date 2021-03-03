import {EntityState} from '@ngrx/entity';

export interface Accounts extends EntityState<Account> {
}

export interface Account {
  id?: number;
  name: string;
  amount: number;
}
