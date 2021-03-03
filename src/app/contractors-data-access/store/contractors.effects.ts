import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ContractorsActions} from './contractors.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {ContractorsApiService} from '@api';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Injectable()
export class ContractorsEffects {
  loadContractors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContractorsActions.loadContractors),
      mergeMap(() => this.contractorsApiService.list()
        .pipe(
          map(contractors => ContractorsActions.loadContractorsSuccess({contractors})),
          catchError((error) => of(ContractorsActions.loadContractorsFailure({ error})))
        )
      )
    )
  );

  createContractor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContractorsActions.createContractor),
      mergeMap((action) => this.contractorsApiService.create(action.contractor)
        .pipe(
          tap((contractor) => this.snackBar.open(`Contractor ${contractor.name} has been added`, 'Close')),
          map((contractor) => ContractorsActions.createContractorSuccess({contractor})),
          catchError((error) => of(ContractorsActions.createContractorFailure({ error})))
        )
      )
    )
  );

  updateContractor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContractorsActions.updateContractor),
      mergeMap((action) => this.contractorsApiService.update(action.contractor)
        .pipe(
          tap((contractor) => this.snackBar.open(`Contractor ${contractor.name} has been updated`, 'Close')),
          map((contractor) => ContractorsActions.updateContractorSuccess({contractor})),
          catchError((error) => of(ContractorsActions.updateContractorFailure({ error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private contractorsApiService: ContractorsApiService,
    private snackBar: MatSnackBar,
  ) {
  }
}
