import {Category} from './category.model';
import {Deserializable} from './deserializable.model';

export class CategoryGroup implements Deserializable {
  _id: string;
  name: string;
  type: number;
  categories: Category[];

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
