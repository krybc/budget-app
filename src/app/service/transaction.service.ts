import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
  ) { }

  list(filters?: any, sort: any = null, limit: number = 1000): Observable<any[]> {
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

  prepareParams(filters?: any, sort: any = null, limit: number = 1000) {
    // console.log(filters);
    if (filters.month) {
      const dateFrom = moment(filters.month).startOf('month').format('YYYY-MM-DD');
      const dateTo = moment(filters.month).endOf('month').format('YYYY-MM-DD');
      delete filters.month;
      filters = {...filters, dateFrom, dateTo};
    }

    // console.log(filters);

    return { params: {...filters, ...sort, limit: limit }};
  }
}
