import {Expose} from 'class-transformer';

export class CategoryModel {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: number;
}
