import {Deserializable} from './deserializable.model';

export class Category implements Deserializable {
  _id: string;
  name: string;
  type: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
