import {Injectable} from '@angular/core';

import {
  catchError, filter,
  map, mapTo,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {TransactionsApiService} from '@api';

import * as DashboardActions from './dashboard.actions';
import {createFlowSummary} from './dashboard.factories';
import {DashboardFacade} from './dashboard.facade';
import {createFromApiListResponse} from '@transactions-data-access';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';

@Injectable()
export class DashboardEffects {

  loadFlowSummary$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadFlowSummary),
      withLatestFrom(
        this.dashboardFacade.params$
      ),
      map(([action,  params]) => ({...action, params})),
      mergeMap((action) => {
          return this.transactionsApiService.list(action.params)
            .pipe(
              map(result => {
                const flowSummary = createFlowSummary(action.params, result);
                return DashboardActions.loadFlowSummarySuccess({flowSummary});
              }),
              catchError((error) => of(DashboardActions.loadFlowSummaryFailure({error})))
            );
        }
      )
    )
  );

  initLatestTransactions$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(DashboardActions.initLatestTransactions)),
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
      mapTo(DashboardActions.loadLatestTransactions())
    )
  );

  loadLatestTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadLatestTransactions),
      withLatestFrom(
        this.accountsFacade.accounts$,
        this.categoriesFacade.categories$,
        this.contractorsFacade.contractors$,
      ),
      map(([action, accounts, categories, contractors]) => ({...action, accounts, categories, contractors})),
      mergeMap((action) => {
          return this.transactionsApiService.list(null, null, 10)
            .pipe(
              map(result => {
                const latestTransactions = createFromApiListResponse(result, action.accounts, action.categories, action.contractors);
                return DashboardActions.loadLatestTransactionsSuccess({latestTransactions});
              }),
              catchError((error) => of(DashboardActions.loadLatestTransactionsFailure({error})))
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
