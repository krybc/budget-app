import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContractorModel } from '../model/contractor.model';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

@Injectable({
  providedIn: 'root'
})
export class ContractorService {

  constructor(
    private http: HttpClient,
  ) { }

  list(): Observable<any[]> {
    return this.http.get<any[]>('contractors')
      .pipe(
        map(result => plainToClass(ContractorModel, result))
      );
  }

  get(id: string): Observable<ContractorModel> {
    return this.http.get<ContractorModel>(`contractor/${id}`)
      .pipe(
        map(result => plainToClass(ContractorModel, result))
      );
  }

  create(item: ContractorModel): Observable<ContractorModel> {
    return this.http.post<ContractorModel>('contractor', item)
      .pipe(
        map(result => plainToClass(ContractorModel, result))
      );
  }

  update(item: ContractorModel): Observable<ContractorModel> {
    return this.http.put<ContractorModel>(`contractor/${item.id}`, item)
      .pipe(
        map(result => plainToClass(ContractorModel, result))
      );
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`contractor/${id}`);
  }
}
