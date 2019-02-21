import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthLoginComponent } from './page/auth-login/auth-login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountListComponent } from './page/account-list/account-list.component';
import { RequestInterceptor} from './interceptor/request.interceptor';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import { BudgetFilterComponent } from './component/budget-filter/budget-filter.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AccountEditComponent } from './page/account-edit/account-edit.component';
import { ContractorEditComponent } from './page/contractor-edit/contractor-edit.component';
import {ContractorListComponent} from './page/contractor-list/contractor-list.component';
import { TransactionEditComponent } from './page/transaction-edit/transaction-edit.component';
import { TransactionListComponent } from './page/transaction-list/transaction-list.component';
import { TransactionFilterComponent } from './component/transaction-filter/transaction-filter.component';
import {DatePipe} from '@angular/common';
import { CategoryGroupEditComponent } from './page/category-group-edit/category-group-edit.component';
import { CategoryEditComponent } from './page/category-edit/category-edit.component';
import { DashboardStatsComponent } from './component/dashboard-stats/dashboard-stats.component';
import { BudgetComponent } from './page/budget/budget.component';
import {ContractorAddComponent} from './page/contractor-add/contractor-add.component';
import {AccountAddComponent} from './page/account-add/account-add.component';
import {TransactionAddComponent} from './page/transaction-add/transaction-add.component';
import { AppLayoutFooterComponent } from './layout/app-layout-footer/app-layout-footer.component';
import {CategoryGroupAddComponent} from './page/category-group-add/category-group-add.component';
import {CategoryAddComponent} from './page/category-add/category-add.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ResponseInterceptor} from './interceptor/response.interceptor';
import {FiltersStore} from './store/filters.store';
import {SharedModule} from './shared/shared.module';

library.add(fas);

export function tokenGetter() {
  return localStorage.getItem('auth-token');
}

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
    DashboardComponent,
    AuthLoginComponent,
    AccountListComponent,
    ContractorListComponent,
    ContractorAddComponent,
    BudgetFilterComponent,
    TransactionAddComponent,
    CategoryAddComponent,
    ContractorEditComponent,
    AccountEditComponent,
    AccountAddComponent,
    ContractorEditComponent,
    TransactionEditComponent,
    TransactionListComponent,
    TransactionFilterComponent,
    CategoryGroupAddComponent,
    CategoryGroupEditComponent,
    CategoryEditComponent,
    DashboardStatsComponent,
    BudgetComponent,
    AppLayoutFooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['localhost:3000/auth/']
      }
    }),
    DeviceDetectorModule.forRoot(),
    SharedModule,
  ],
  providers: [
    DatePipe,
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
    FiltersStore,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
