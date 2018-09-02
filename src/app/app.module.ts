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
import {ToastrModule} from 'ngx-toastr';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { AccountEditComponent } from './page/account-edit/account-edit.component';
import { ContractorEditComponent } from './page/contractor-edit/contractor-edit.component';
import {ContractorListComponent} from './page/contractor-list/contractor-list.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { ErrorsComponent } from './shared/errors/errors.component';
import { TransactionEditComponent } from './page/transaction-edit/transaction-edit.component';
import { TransactionListComponent } from './page/transaction-list/transaction-list.component';
import { TransactionFilterComponent } from './component/transaction-filter/transaction-filter.component';
import {DatePipe} from '@angular/common';
import { CategoryGroupEditComponent } from './page/category-group-edit/category-group-edit.component';
import { CategoryEditComponent } from './page/category-edit/category-edit.component';
import { DashboardStatsComponent } from './component/dashboard-stats/dashboard-stats.component';
import {PieChartModule} from '@swimlane/ngx-charts';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule, MatListModule, MatMenuModule, MatProgressSpinnerModule, MatRadioModule, MatSelectModule,
  MatTableModule,
  MatToolbarModule, MatTooltipModule
} from '@angular/material';
import { BudgetComponent } from './page/budget/budget.component';
import {ContractorAddComponent} from './page/contractor-add/contractor-add.component';
import {AccountAddComponent} from './page/account-add/account-add.component';
import {TransactionAddComponent} from './page/transaction-add/transaction-add.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppLayoutFooterComponent } from './layout/app-layout-footer/app-layout-footer.component';
import {CategoryGroupAddComponent} from './page/category-group-add/category-group-add.component';
import {CategoryAddComponent} from './page/category-add/category-add.component';
import {DeviceDetectorModule} from 'ngx-device-detector';
import {ResponseInterceptor} from './interceptor/response.interceptor';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {ResponsiveModule} from 'ngx-responsive';

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
    ErrorsComponent,
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
        whitelistedDomains: ['localhost:3001'],
        blacklistedRoutes: ['localhost:3001/auth/']
      }
    }),
    ResponsiveModule.forRoot(),
    DeviceDetectorModule.forRoot(),
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    PieChartModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatToolbarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatRadioModule,
    MatTooltipModule,
    MatChipsModule,
    MatMenuModule,
    MatMomentDateModule,
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatAutocompleteModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
