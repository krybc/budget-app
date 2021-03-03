import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AuthModule} from '@auth';

import {RequestInterceptor} from './interceptors/request.interceptor';
import {ResponseInterceptor} from './interceptors/response.interceptor';
import {
  AccountsApiService,
  ContractorsApiService,
  CategoriesApiService,
  TransactionsApiService
} from './services';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthModule,
  ],
  providers: [
    AccountsApiService,
    CategoriesApiService,
    ContractorsApiService,
    TransactionsApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
  ]
})
export class ApiModule { }
