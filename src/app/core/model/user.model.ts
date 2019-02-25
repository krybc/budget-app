import {Expose} from 'class-transformer';

export class UserModel {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
