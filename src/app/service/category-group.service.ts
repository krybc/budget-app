import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CategoryGroup} from '../model/categoryGroup.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryGroupService {

  constructor(
    private http: HttpClient,
  ) { }

  get(id: string): Observable<any[]> {
    return this.http.get<any[]>(`categoryGroup/${id}`);
  }

  create(item: any): Observable<any> {
    return this.http.post('categoryGroup', item);
  }

  update(item: CategoryGroup): Observable<CategoryGroup> {
    return this.http.put<CategoryGroup>(`categoryGroup/${item._id}`, item)
      .pipe(
        tap(result => new CategoryGroup().deserialize(result))
      );
  }
}
