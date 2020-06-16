import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountModel } from '../model/account.model';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<AccountModel[]> {
    return this.http.get<AccountModel[]>('accounts')
      .pipe(
        map(result => plainToClass(AccountModel, result as Object[], { strategy: 'excludeAll' }))
      );
  }

  get(id: string): Observable<AccountModel> {
    return this.http.get<AccountModel>(`account/${id}`)
      .pipe(
        map(result => plainToClass(AccountModel, result as Object, { strategy: 'excludeAll' }))
      );
  }

  create(item: AccountModel): Observable<AccountModel> {
    return this.http.post<AccountModel>('account', item)
      .pipe(
        map(result => plainToClass(AccountModel, result as Object))
      );
  }

  update(item: AccountModel): Observable<AccountModel> {
    return this.http.put<AccountModel>(`account/${item.id}`, item)
      .pipe(
        map(result => plainToClass(AccountModel, result as Object))
      );
  }
}
