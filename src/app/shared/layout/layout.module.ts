import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthLayoutComponent} from './components/auth-layout/auth-layout.component';
import {AppLayoutComponent} from './containers/app-layout/app-layout.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

const matModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  FlexLayoutModule,
  MatSidenavModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [
    AuthLayoutComponent,
    AppLayoutComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ...matModules,
  ],
})
export class SharedLayoutModule { }
