import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransactionsRoutingModule} from './transactions-routing.module';
import {TransactionAddComponent} from './containers/transaction-add/transaction-add.component';
import {TransactionEditComponent} from './containers/transaction-edit/transaction-edit.component';
import {TransactionListComponent} from './containers/transaction-list/transactions-list.component';
import {TransactionsFiltersComponent} from './components/filters/filters.component';
import {CommonModule} from '@angular/common';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import {ShellComponent} from '@transactions/shell.component';
import {TransactionsDataAccessModule} from '@transactions-data-access';
import {SharedDateModule} from '@shared/date';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {SharedSpinnerModule} from '@shared/spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SharedUiModule} from '@shared/ui';
import {SharedFormsModule} from '@shared/forms';

const uiModules = [
  FlexLayoutModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatTableModule,
  SharedSpinnerModule,
  SharedUiModule,
];

@NgModule({
  declarations: [
    ShellComponent,
    TransactionAddComponent,
    TransactionEditComponent,
    TransactionListComponent,
    TransactionsFiltersComponent,
    TransactionFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    TransactionsDataAccessModule,
    ...uiModules,
    SharedDateModule,
    SharedFormsModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class TransactionsModule { }
