import {Expose} from 'class-transformer';

export class AccountModel {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  amount: number;
}
