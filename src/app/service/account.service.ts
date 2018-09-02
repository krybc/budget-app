import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Account} from '../model/account.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
  ) { }

  list(filters?: any): Observable<Account[]> {
    return this.http.get<Account[]>('accounts', ...filters);
      // .pipe(
      //   map((item) => {
      //     console.log(item);
      //     return new Account().deserialize(item);
      //   })
      // );
  }

  get(id: string): Observable<Account> {
    return this.http.get<Account>(`account/${id}`)
      .pipe(
        tap((item) => new Account().deserialize(item))
      );
  }

  create(item: Account): Observable<Account> {
    return this.http.post<Account>('account', item);
  }

  update(item: Account): Observable<Account> {
    return this.http.put<Account>(`account/${item._id}`, item);
  }
}
