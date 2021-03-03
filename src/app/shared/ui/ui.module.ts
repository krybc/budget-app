import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BackComponent} from './components/back/back.component';
import {DialogComponent} from './components/dialog/dialog.component';
import {ErrorsComponent} from './components/errors/errors.component';
import {LoadingComponent} from './components/loading/loading.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    BackComponent,
    DialogComponent,
    ErrorsComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    BackComponent,
    DialogComponent,
    ErrorsComponent,
    LoadingComponent,
  ]
})
export class SharedUiModule { }
