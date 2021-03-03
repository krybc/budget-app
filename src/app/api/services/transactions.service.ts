import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TransactionApiModel, TransactionsQueryParams} from '../models';
import { map } from 'rxjs/operators';
import {TransactionFactory} from '../factories/transaction.factory';

@Injectable({
  providedIn: 'root',
})
export class TransactionsApiService {
  private readonly rootPath = 'transactions';

  constructor(
    private http: HttpClient,
  ) { }

  list(filters?: TransactionsQueryParams, sort: any = null, limit: number = 1000): Observable<TransactionApiModel[]> {
    const params = this.prepareParams(filters, sort, limit);

    return this.http.get<TransactionApiModel[]>(`${this.rootPath}`, { ...params })
      .pipe(
        map(result => result.map(item => TransactionFactory.createFromResponse(item)))
      );
  }

  get(id: string): Observable<TransactionApiModel> {
    return this.http.get<TransactionApiModel>(`${this.rootPath}/${id}`);
  }

  create(transaction: TransactionApiModel): Observable<TransactionApiModel> {
    return this.http.post<TransactionApiModel>(`${this.rootPath}`, transaction);
  }

  update(transaction: TransactionApiModel): Observable<TransactionApiModel> {
    return this.http.put<TransactionApiModel>(`${this.rootPath}/${transaction.id}`, transaction);
  }

  delete(transaction: TransactionApiModel): Observable<any> {
    return this.http.delete(`${this.rootPath}/${transaction.id}`);
  }

  prepareParams(filters?: TransactionsQueryParams, sort: any = null, limit: number = null) {
    let result = { };

    filters = !filters ? {} : filters;

    if (filters.dateFrom) {
      result = {...result, dateFrom: filters.dateFrom.toISODate()};
    }

    if (filters.dateTo) {
      result = {...result, dateTo: filters.dateTo.toISODate()};
    }

    if (filters.account) {
      result = {...result, ...{account: filters.account}};
    }

    if (filters.category) {
      result = {...result, ...{category: filters.category}};
    }

    if (filters.contractor) {
      result = {...result, ...{contractor: filters.contractor}};
    }

    if (limit) {
      result = {...result, limit};
    }

    return { params: {...result, ...sort }};
  }
}
