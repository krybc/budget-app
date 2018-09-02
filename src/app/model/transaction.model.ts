import {Deserializable} from './deserializable.model';
import {Category} from './category.model';
import {Account} from './account.model';
import {Contractor} from './contractor.model';

export class Transaction implements Deserializable {
  _id: string;
  category: Category;
  account: Account;
  contractor: string | Contractor;
  date: string;
  income: number;
  expense: number;
  description: string;

  deserialize(input: any) {
    Object.assign(this, input);
    this.category = new Category().deserialize(input.category);
    this.account = new Account().deserialize(input.account);
    this.contractor = typeof input.contractor === 'object' ? new Contractor().deserialize(input.contractor) : input.contractor;
    return this;
  }
}
