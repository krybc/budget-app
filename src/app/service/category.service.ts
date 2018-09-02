import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe} from 'rxjs';
import {Category} from '../model/category.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  list(filters?: any): Observable<any[]> {
    return this.http.get<any[]>('categories', ...filters);
  }

  get(id: string): Observable<Category> {
    return this.http.get<Category>(`category/${id}`)
      .pipe(
        tap(result => new Category().deserialize(result))
      );
  }

  tree(): Observable<any[]> {
    return this.http.get<any[]>('categories/tree');
  }

  create(item: Category): Observable<Category> {
    return this.http.post<Category>('category', item)
      .pipe(
        tap(result => new Category().deserialize(result))
      );
  }

  update(item: Category): Observable<Category> {
    return this.http.put<Category>(`category/${item._id}`, item)
      .pipe(
        tap(result => new Category().deserialize(result))
      );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`category/${id}`);
  }
}
