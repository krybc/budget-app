import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './layout/app-layout/app-layout.component';
import {AuthLayoutComponent} from './layout/auth-layout/auth-layout.component';
import {BrowserModule} from '@angular/platform-browser';
import {BudgetModule} from '../budget/budget.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {SharedModule} from '../shared/shared.module';
import {DatePipe} from '@angular/common';
import {RequestInterceptor} from './interceptor/request.interceptor';
import {ResponseInterceptor} from './interceptor/response.interceptor';
import {FiltersStore} from './store/filters.store';
import {AuthLoginPageComponent} from './page/auth/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService} from './guard/auth-guard.service';
import {DashboardModule} from '../dashboard/dashboard.module';
import {AccountModule} from '../account/account.module';
import {TransactionModule} from '../transaction/transaction.module';
import {ContractorModule} from '../contractor/contractor.module';
import {CategoryModule} from '../category/category.module';
import {CategoryGroupModule} from '../category-group/category-group.module';
import {SidebarComponent} from './layout/app-layout/component/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('auth-token');
}

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: AuthLoginPageComponent
      }
    ]
  },
  {
    path: 'app',
    component: AppLayoutComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  declarations: [
    AuthLayoutComponent,
    AppLayoutComponent,
    AuthLoginPageComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DashboardModule,
    TransactionModule,
    ContractorModule,
    CategoryGroupModule,
    CategoryModule,
    BudgetModule,
    AccountModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
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
  exports: [
    RouterModule,
  ]
})
export class CoreModule { }
