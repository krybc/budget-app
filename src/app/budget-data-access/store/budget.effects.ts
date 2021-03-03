import {Injectable} from '@angular/core';

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
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {TransactionsApiService} from '@api';

import {BudgetActions} from './budget.actions';
import {BudgetFactories} from './budget.factories';
import {BudgetFacade} from './budget.facade';
import {CategoriesFacade} from '@categories-data-access';

@Injectable()
export class BudgetEffects {

  initBudget$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(BudgetActions.initBudget)),
      this.categoriesFacade.categoriesLoaded$.pipe(
        filter(it => it !== false)
      ),
    ]).pipe(
      mapTo(BudgetActions.loadBudget())
    )
  );

  loadBudget$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BudgetActions.loadBudget),
      withLatestFrom(
        this.categoriesFacade.categories$,
        this.budgetFacade.params$
      ),
      map(([action, categories, params]) => ({...action, categories, params})),
      mergeMap((action) => {
          const params = {
            dateFrom: action.params.month.startOf('month'),
            dateTo: action.params.month.endOf('month')
          };

          return this.transactionsApiService.list(params)
            .pipe(
              map(result => {
                const budget = BudgetFactories.createBudget(action.categories, result);
                return BudgetActions.loadBudgetSuccess({budget});
              }),
              catchError((error) => of(BudgetActions.loadBudgetFailure({error})))
            );
        }
      )
    )
  );

  setParams$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(BudgetActions.setParams)),
      this.budgetFacade.params$.pipe(
        distinctUntilChanged((prev, curr) => {
          return prev.month.equals(curr.month);
        })
      )
    ]).pipe(
      map(() => BudgetActions.loadBudget())
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesFacade: CategoriesFacade,
    private budgetFacade: BudgetFacade,
    private transactionsApiService: TransactionsApiService,
  ) {
  }
}
