import {Deserializable} from './deserializable.model';

export class User implements Deserializable {
  _id: string;
  firstName: string;
  lastName: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
