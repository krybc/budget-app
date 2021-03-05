import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import {combineLatest, of} from 'rxjs';
import {tap} from 'rxjs/internal/operators';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {TransactionsApiService} from '@api';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';

import {TransactionsActions} from './transactions.actions';
import {TransactionsFactories} from './transactions.factories';
import {TransactionsFacade} from './transactions.facade';


@Injectable()
export class TransactionsEffects {

  initTransactions$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(TransactionsActions.initTransactions)),
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
      mapTo(TransactionsActions.loadTransactions())
    )
  );

  loadTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.loadTransactions),
      withLatestFrom(
        this.accountsFacade.accounts$,
        this.categoriesFacade.categories$,
        this.contractorsFacade.contractors$,
        this.transactionsFacade.filters$
      ),
      map(([action, accounts, categories, contractors, filters]) => ({...action, accounts, categories, contractors, filters})),
      mergeMap((action) => {
          const filters = {
            ...action.filters,
            dateFrom: action.filters.month.startOf('month'),
            dateTo: action.filters.month.endOf('month'),
            account: action.filters.account ? action.filters.account.id : null,
            category: action.filters.category ? action.filters.category.id : null,
            contractor: action.filters.contractor ? action.filters.contractor.id : null
          };
          return this.transactionsApiService.list(filters)
            .pipe(
              map(result => {
                const transactions = TransactionsFactories.createFromApiListResponse(result, action.accounts, action.categories, action.contractors);
                return TransactionsActions.loadTransactionsSuccess({transactions});
              }),
              catchError((error) => of(TransactionsActions.loadTransactionsFailure({error})))
            );
        }
      )
    )
  );

  setFilters$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(
        ofType(TransactionsActions.setFilters),
        withLatestFrom(
          this.transactionsFacade.filters$.pipe(
            distinctUntilChanged((prev, curr) => {
              return prev.month.equals(curr.month);
            })
          ),
        )
      ),
    ]).pipe(
      mapTo(TransactionsActions.loadTransactions())
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransaction),
      withLatestFrom(this.accountsFacade.accounts$, this.categoriesFacade.categories$, this.contractorsFacade.contractors$),
      map(([action, accounts, categories, contractors]) => ({...action, accounts, categories, contractors})),
      mergeMap((action) => this.transactionsApiService.create(TransactionsFactories.createToApiRequest(action.transaction))
        .pipe(
          tap((transaction) => this.snackBar.open(`Transaction for ${transaction.income ?? transaction.expense} has been added`, 'Close')),
          map((result) => {
            const transaction = TransactionsFactories.createFromApiResponse(result, action.accounts, action.categories, action.contractors);
            return TransactionsActions.createTransactionSuccess({transaction});
          }),
          catchError((error) => of(TransactionsActions.createTransactionFailure({error})))
        )
      )
    )
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.updateTransaction),
      withLatestFrom(this.accountsFacade.accounts$, this.categoriesFacade.categories$, this.contractorsFacade.contractors$),
      map(([action, accounts, categories, contractors]) => ({...action, accounts, categories, contractors})),
      mergeMap((action) => this.transactionsApiService.update(TransactionsFactories.createToApiRequest(action.transaction))
        .pipe(
          tap((transaction) => this.snackBar.open(`Transaction for ${transaction.income > 0 ? transaction.income : transaction.expense} has been updated`, 'Close')),
          map((result) => {
            const transaction = TransactionsFactories.createFromApiResponse(result, action.accounts, action.categories, action.contractors);
            return TransactionsActions.updateTransactionSuccess({transaction});
          }),
          catchError((error) => of(TransactionsActions.updateTransactionFailure({error})))
        )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.deleteTransaction),
      mergeMap((action) => this.transactionsApiService.delete(TransactionsFactories.createToApiRequest(action.transaction))
        .pipe(
          tap((transaction) => this.snackBar.open(`Transaction for ${transaction.income > 0 ? transaction.income : transaction.expense} has been removed`, 'Close')),
          map((transaction) => {
            return TransactionsActions.deleteTransactionSuccess({transaction});
          }),
          catchError((error) => of(TransactionsActions.deleteTransactionFailure({error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private accountsFacade: AccountsFacade,
    private categoriesFacade: CategoriesFacade,
    private contractorsFacade: ContractorsFacade,
    private transactionsFacade: TransactionsFacade,
    private transactionsApiService: TransactionsApiService,
    private snackBar: MatSnackBar,
  ) {
  }
}
