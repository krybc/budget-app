import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromTransactions from './store/transactions.reducer';
import {EffectsModule} from '@ngrx/effects';
import {TransactionsEffects} from './store/transactions.effects';
import {TransactionsFacade} from './store/transactions.facade';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ApiModule} from '@api';

const matModules = [
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTransactions.TRANSACTIONS_FEATURE_KEY,
      fromTransactions.reducer
    ),
    EffectsModule.forFeature([TransactionsEffects]),
    ...matModules,
    ApiModule,
  ],
  providers: [
    TransactionsFacade,
  ]
})
export class TransactionsDataAccessModule { }
