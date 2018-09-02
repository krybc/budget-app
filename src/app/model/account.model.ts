import {Deserializable} from './deserializable.model';

export class Account implements Deserializable {
  _id: string;
  name: string;
  amount: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
