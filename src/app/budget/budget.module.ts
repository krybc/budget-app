import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {BudgetDataAccessModule} from '@budget-data-access';

import {BudgetComponent} from './containers/budget/budget.component';
import {BudgetRoutingModule} from './budget-routing.module';
import {BudgetParamsComponent} from './components/params/params.component';
import {BudgetShellComponent} from './shell.component';
import { BudgetTableComponent } from './components/budget-table/budget-table.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {SharedSpinnerModule} from '@shared/spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {SharedDateModule} from '@shared/date';
import {DragDropModule} from '@angular/cdk/drag-drop';

const uiModules = [
  FlexLayoutModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  DragDropModule,
  MatSelectModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatToolbarModule,
  SharedDateModule,
  SharedSpinnerModule,
];

@NgModule({
  declarations: [
    BudgetShellComponent,
    BudgetComponent,
    BudgetParamsComponent,
    BudgetTableComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BudgetRoutingModule,
    BudgetDataAccessModule,
    ...uiModules,
  ],
  exports: [
    RouterModule,
  ],
})
export class BudgetModule { }
