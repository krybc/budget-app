import {DateTime} from 'luxon';
import {TransactionApiModel} from '../models';

export class TransactionFactory {
  public static createFromResponse(plain): TransactionApiModel {
    return {...plain, date: DateTime.fromISO(plain.date)};
  }
}
