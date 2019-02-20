import {Expose} from 'class-transformer';

export class ContractorModel {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  street: string;

  @Expose()
  city: string;
}
