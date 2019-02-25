import { CategoryModel } from './category.model';
import { Expose, Type } from 'class-transformer';

export class CategoryGroupModel {
  @Expose({ name: '_id' })
  id: string;

  @Expose()
  name: string;

  @Expose()
  type: number;

  @Expose()
  @Type(() => CategoryModel)
  categories: CategoryModel[];
}
