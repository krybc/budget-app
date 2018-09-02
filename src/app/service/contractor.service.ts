import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Contractor} from '../model/contractor.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<any[]> {
    return this.http.get<any[]>('contractors');
  }

  get(id: string): Observable<Contractor> {
    return this.http.get<Contractor>(`contractor/${id}`)
      .pipe(
        tap(result => new Contractor().deserialize(result))
      );
  }

  create(item: Contractor): Observable<Contractor> {
    return this.http.post<Contractor>('contractor', item)
      .pipe(
        tap(result => new Contractor().deserialize(result))
      );
  }

  update(item: Contractor): Observable<Contractor> {
    return this.http.put<Contractor>(`contractor/${item._id}`, item)
      .pipe(
        tap(result => new Contractor().deserialize(result))
      );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`contractor/${id}`);
  }
}
