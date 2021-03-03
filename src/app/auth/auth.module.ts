import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginComponent} from './containers/login/login.component';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './guards/auth-guard.service';
import {RouterModule, Routes} from '@angular/router';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

const matModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
];


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  }
];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    ...matModules,
  ],
  providers: [
    AuthService,
    AuthGuardService,
  ]
})
export class AuthModule { }
