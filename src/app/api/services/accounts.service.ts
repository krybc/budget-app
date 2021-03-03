import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AccountApiModel} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountsApiService {
  private readonly rootPath = 'accounts';

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<AccountApiModel[]> {
    return this.http.get<AccountApiModel[]>(`${this.rootPath}`);
  }

  get(id: string): Observable<AccountApiModel> {
    return this.http.get<AccountApiModel>(`${this.rootPath}/${id}`);
  }

  create(item: AccountApiModel): Observable<AccountApiModel> {
    return this.http.post<AccountApiModel>(`${this.rootPath}`, item);
  }

  update(item: AccountApiModel): Observable<AccountApiModel> {
    return this.http.put<AccountApiModel>(`${this.rootPath}/${item.id}`, item);
  }
}
