import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractorApiModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContractorsApiService {
  private readonly rootPath = 'contractors';

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<ContractorApiModel[]> {
    return this.http.get<ContractorApiModel[]>(`${this.rootPath}`);
  }

  get(id: string): Observable<ContractorApiModel> {
    return this.http.get<ContractorApiModel>(`${this.rootPath}/${id}`);
  }

  create(item: ContractorApiModel): Observable<ContractorApiModel> {
    return this.http.post<ContractorApiModel>(`${this.rootPath}`, item);
  }

  update(item: ContractorApiModel): Observable<ContractorApiModel> {
    return this.http.put<ContractorApiModel>(`${this.rootPath}/${item.id}`, item);
  }

  delete(id: any): Observable<unknown> {
    return this.http.delete(`${this.rootPath}/${id}`);
  }
}
