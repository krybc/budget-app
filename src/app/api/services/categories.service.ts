import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CategoryApiModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesApiService {
  private readonly rootPath = 'categories';
  private readonly patchOrderPath = 'order';

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<CategoryApiModel[]> {
    return this.http.get<any[]>(`${this.rootPath}`);
  }

  get(id: string): Observable<CategoryApiModel> {
    return this.http.get<CategoryApiModel>(`${this.rootPath}/${id}`);
  }

  create(item: CategoryApiModel): Observable<CategoryApiModel> {
    return this.http.post<CategoryApiModel>(`${this.rootPath}`, item);
  }

  update(item: CategoryApiModel): Observable<CategoryApiModel> {
    return this.http.put<CategoryApiModel>(`${this.rootPath}/${item.id}`, item);
  }

  delete(item: CategoryApiModel): Observable<any> {
    return this.http.delete(`${this.rootPath}/${item.id}`);
  }

  patchOrder(item: CategoryApiModel): Observable<any> {
    return this.http.patch(`${this.rootPath}/${item.id}/${this.patchOrderPath}/${item.sequence}`, { order: item.sequence });
  }
}
