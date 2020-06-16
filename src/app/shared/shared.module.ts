import {NgModule} from '@angular/core';
import {ResponsiveModule} from 'ngx-responsive';
import {PieChartModule} from '@swimlane/ngx-charts';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ErrorsComponent} from './component/errors/errors.component';
import { BackComponent } from './component/back/back.component';
import { LoadingComponent } from './component/loading/loading.component';
import { DialogComponent } from './component/dialog/dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
