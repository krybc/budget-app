import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../model/category.model';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import {CategoryGroupModel} from '../model/category-group.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
  ) { }

  list(filters?: any): Observable<any[]> {
    return this.http.get<any[]>('categories', ...filters)
      .pipe(
        map(items => plainToClass(CategoryModel, items))
      );
  }

  get(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(`category/${id}`)
      .pipe(
        map(item => plainToClass(CategoryModel, item))
      );
  }

  tree(): Observable<CategoryGroupModel[]> {
    return this.http.get<any[]>('categories/tree')
      .pipe(
        map(result => plainToClass(CategoryGroupModel, result as Object[]))
      );
  }

  create(item: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>('category', item)
      .pipe(
        map(result => plainToClass(CategoryModel, result as Object))
      );
  }

  update(item: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`category/${item.id}`, item)
      .pipe(
        map(result => plainToClass(CategoryModel, result as Object))
      );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`category/${id}`);
  }
}
