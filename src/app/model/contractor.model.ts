import {Deserializable} from './deserializable.model';

export class Contractor implements Deserializable {
  _id: string;
  name: string;
  street: string;
  city: string;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
