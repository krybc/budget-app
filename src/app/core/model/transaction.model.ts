import { CategoryModel } from './category.model';
import { AccountModel } from './account.model';
import { ContractorModel } from './contractor.model';
import { Expose, Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';

export class TransactionModel {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  @Type(() => CategoryModel)
  category: CategoryModel;

  @Expose()
  @Type(() => AccountModel)
  account: AccountModel;

  @Expose()
  @Type(() => ContractorModel)
  contractor: ContractorModel;

  @Expose()
  @Type(() => DateTime)
  @Transform(value => DateTime.fromISO(value), { toClassOnly: true })
  date: DateTime;

  @Expose()
  income: number;

  @Expose()
  expense: number;

  @Expose()
  description: string;
}
