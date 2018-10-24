import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';
import {FiltersState} from '../state/filters.state';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) { }

  list(filters?: FiltersState, sort: any = null, limit: number = 1000): Observable<any[]> {
    const params = this.prepareParams(filters, sort, limit);

    return this.http.get<any[]>('transactions', { ...params });
  }

  get(id: string): Observable<any[]> {
    return this.http.get<any[]>(`transaction/${id}`);
  }

  create(transaction: any): Observable<any> {
    transaction.contractor = transaction.contractor._id;
    console.log(transaction);
    return this.http.post('transaction', transaction);
  }

  update(transaction: any): Observable<any> {
    return this.http.put(`transaction/${transaction._id}`, transaction);
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
      const dateFrom = filters.month.startOf('month').format('YYYY-MM-DD');
      const dateTo = filters.month.endOf('month').format('YYYY-MM-DD');
      result = {...result, dateFrom, dateTo};
    }

    if (filters.category !== null) {
      result = {...result, ...{category: filters.category._id}};
    }

    if (filters.contractor !== null) {
      result = {...result, ...{contractor: filters.contractor._id}};
    }

    return { params: {...result, ...sort, limit: limit }};
  }
}
