import {NgModule} from '@angular/core';
import {ResponsiveModule} from 'ngx-responsive';
import {PieChartModule} from '@swimlane/ngx-charts';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorsComponent} from './component/errors/errors.component';
import { BackComponent } from './component/back/back.component';
import { LoadingComponent } from './component/loading/loading.component';
import { DialogComponent } from './component/dialog/dialog.component';

@NgModule({
  declarations: [
    ErrorsComponent,
    BackComponent,
    LoadingComponent,
    DialogComponent,
  ],
  imports: [
    ResponsiveModule.forRoot(),
    NoopAnimationsModule,
    BrowserAnimationsModule,
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
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    ResponsiveModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
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
    MatListModule,
    MatDividerModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatIconModule,
    ErrorsComponent,
    BackComponent,
    LoadingComponent,
    MatSnackBarModule,
  ],
  entryComponents: [
    DialogComponent,
  ],
  providers: [],
})
export class SharedModule { }
