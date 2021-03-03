import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ApiModule} from '@api';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataAccessModule} from '@data-access';
import {JwtModule} from '@auth0/angular-jwt';
import {AppRoutingModule} from './app-routing.module';
import {AccountsDataAccessModule} from '@accounts-data-access';
import {CategoriesDataAccessModule} from '@categories-data-access';
import {ContractorsDataAccessModule} from '@contractors-data-access';
import {TransactionsDataAccessModule} from '@transactions-data-access';
import {ResponsiveModule} from 'ngx-responsive';

export function tokenGetter() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    ApiModule,
    ResponsiveModule.forRoot(),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    DataAccessModule.forRoot(environment.production),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    AppRoutingModule,
    AccountsDataAccessModule,
    CategoriesDataAccessModule,
    ContractorsDataAccessModule,
    TransactionsDataAccessModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
