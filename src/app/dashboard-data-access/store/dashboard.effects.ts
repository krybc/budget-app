import {Injectable} from '@angular/core';

import {
  catchError,
  filter,
  map,
  mapTo,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {TransactionsApiService} from '@api';

import {createFromApiListResponse} from '@transactions-data-access';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';

import * as DashboardActions from './dashboard.actions';
import {DashboardFacade} from './dashboard.facade';

@Injectable()
export class DashboardEffects {

  initTransactionsToSummary$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(DashboardActions.initTransactionsToSummary)),
      this.accountsFacade.accountsLoaded$.pipe(
        filter(it => it !== false)
      ),
      this.categoriesFacade.categoriesLoaded$.pipe(
        filter(it => it !== false)
      ),
      this.contractorsFacade.contractorsLoaded$.pipe(
        filter(it => it !== false)
      ),
    ]).pipe(
      mapTo(DashboardActions.loadTransactionsToSummary())
    )
  );

  loadLatestTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadTransactionsToSummary),
      withLatestFrom(
        this.dashboardFacade.transactionsToSummaryParams$,
        this.accountsFacade.accounts$,
        this.categoriesFacade.categories$,
        this.contractorsFacade.contractors$,
      ),
      map(([action, params, accounts, categories, contractors]) => ({...action, params, accounts, categories, contractors})),
      mergeMap((action) => {
          return this.transactionsApiService.list(action.params)
            .pipe(
              map(result => {
                const transactionsToSummary = createFromApiListResponse(result, action.accounts, action.categories, action.contractors);
                return DashboardActions.loadTransactionsToSummarySuccess({transactionsToSummary});
              }),
              catchError((error) => of(DashboardActions.loadTransactionsToSummaryFailure({error})))
            );
        }
      )
    )
  );

  constructor(
    private actions$: Actions,
    private accountsFacade: AccountsFacade,
    private categoriesFacade: CategoriesFacade,
    private contractorsFacade: ContractorsFacade,
    private dashboardFacade: DashboardFacade,
    private transactionsApiService: TransactionsApiService,
  ) {
  }
}
