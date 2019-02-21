import {NgModule} from '@angular/core';
import {ResponsiveModule} from 'ngx-responsive';
import {ToastrModule} from 'ngx-toastr';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
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
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorsComponent} from './component/errors/errors.component';

@NgModule({
  declarations: [
    ErrorsComponent,
  ],
  imports: [
    ResponsiveModule.forRoot(),
    ToastrModule.forRoot(),
    NoopAnimationsModule,
    BrowserAnimationsModule,
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
    MatSidenavModule,
  ],
  exports: [
    ResponsiveModule,
    ToastrModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
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
    MatSidenavModule,
    ErrorsComponent,
  ],
  providers: [],
})
export class SharedModule { }
