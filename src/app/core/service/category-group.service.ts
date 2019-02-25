import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CategoryGroupModel} from '../model/category-group.model';
import {map} from 'rxjs/operators';
import {plainToClass} from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class CategoryGroupService {

  constructor(
    private http: HttpClient,
  ) { }

  get(id: string): Observable<CategoryGroupModel> {
    return this.http.get<any[]>(`categoryGroup/${id}`)
      .pipe(
        map(result => plainToClass(CategoryGroupModel, result as Object))
      );
  }

  create(item: CategoryGroupModel): Observable<CategoryGroupModel> {
    return this.http.post('categoryGroup', item)
      .pipe(
        map(result => plainToClass(CategoryGroupModel, result as Object))
      );
  }

  update(item: CategoryGroupModel): Observable<CategoryGroupModel> {
    return this.http.put<CategoryGroupModel>(`categoryGroup/${item.id}`, item)
      .pipe(
        map(result => plainToClass(CategoryGroupModel, result as Object))
      );
  }
}
