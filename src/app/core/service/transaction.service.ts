import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import { FiltersState } from '../state/filters.state';
import { TransactionModel } from '../model/transaction.model';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) { }

  list(filters?: FiltersState, sort: any = null, limit: number = 1000): Observable<TransactionModel[]> {
    const params = this.prepareParams(filters, sort, limit);

    return this.http.get<any[]>('transactions', { ...params })
      .pipe(
        map(result => plainToClass(TransactionModel, result))
      );
  }

  get(id: string): Observable<TransactionModel> {
    return this.http.get<any[]>(`transaction/${id}`)
      .pipe(
        map(result => plainToClass(TransactionModel, result as Object))
      );
  }

  create(transaction: TransactionModel): Observable<TransactionModel> {
    console.log(transaction);
    return this.http.post('transaction', {...transaction, ...{category: transaction.category.id, account: transaction.account.id, contractor: transaction.contractor.id}})
      .pipe(
        map(result => plainToClass(TransactionModel, result as Object))
      );
  }

  update(transaction: TransactionModel): Observable<TransactionModel> {
    return this.http.put(`transaction/${transaction.id}`, transaction)
      .pipe(
        map(result => plainToClass(TransactionModel, result as Object))
      );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`transaction/${id}`);
  }

  summary(filters?: any): Observable<any> {
    const params = this.prepareParams(filters);

    return this.http.get<any>('transactions/summary', { ...params });
  }

  prepareParams(filters?: FiltersState, sort: any = null, limit: number = 1000) {
    let result = {};
    if (filters.month !== null) {
      const dateFrom = filters.month.startOf('month').toFormat('yyyy-LL-dd');
      const dateTo = filters.month.endOf('month').toFormat('yyyy-LL-dd');
      result = {...result, dateFrom, dateTo};
    }

    if (filters.category !== null) {
      result = {...result, ...{category: filters.category.id}};
    }

    if (filters.contractor !== null) {
      result = {...result, ...{contractor: filters.contractor.id}};
    }

    return { params: {...result, ...sort, limit: limit }};
  }
}
