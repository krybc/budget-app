import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AccountsActions} from './accounts.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {Injectable} from '@angular/core';
import {AccountsApiService} from '@api';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable()
export class AccountsEffects {
  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.loadAccounts),
      mergeMap(() => this.accountsApiService.list()
        .pipe(
          map(accounts => AccountsActions.loadAccountsSuccess({accounts})),
          catchError((error) => of(AccountsActions.loadAccountsFailure({ error})))
        )
      )
    )
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.createAccount),
      mergeMap((action, account) => this.accountsApiService.create(action.account)
        .pipe(
          tap((account) => this.snackBar.open(`Account ${account.name} has been added`, 'Close')),
          map((account) => AccountsActions.createAccountSuccess({account})),
          catchError((error) => of(AccountsActions.createAccountFailure({ error})))
        )
      )
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.updateAccount),
      mergeMap((action, account) => this.accountsApiService.update(action.account)
        .pipe(
          tap((account) => this.snackBar.open(`Account ${account.name} has been updated`, 'Close')),
          map((account) => AccountsActions.updateAccountSuccess({account})),
          catchError((error) => of(AccountsActions.updateAccountFailure({ error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private accountsApiService: AccountsApiService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }
}
