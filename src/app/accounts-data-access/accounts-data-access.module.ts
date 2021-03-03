import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromAccounts from './store/accounts.reducer';
import {EffectsModule} from '@ngrx/effects';
import {AccountsEffects} from './store/accounts.effects';
import {AccountsFacade} from './store/accounts.facade';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const matModules = [
  MatSnackBarModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAccounts.ACCOUNTS_FEATURE_KEY,
      fromAccounts.reducer
    ),
    EffectsModule.forFeature([AccountsEffects]),
    ...matModules,
  ],
  providers: [
    AccountsFacade,
  ]
})
export class AccountsDataAccessModule { }
