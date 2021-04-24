import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as CategoriesActions from './categories.actions';
import {catchError, map, mergeMap, withLatestFrom, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CategoriesApiService} from '@api';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {CategoriesFacade} from '../store/categories.facade';
import {CategoriesFactories} from '../store/categories.factories';


@Injectable()
export class CategoriesEffects {
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories, CategoriesActions.setOrderSuccess),
      mergeMap(() => this.categoriesApiService.list()
        .pipe(
          map(categories => CategoriesActions.loadCategoriesSuccess({ categories: CategoriesFactories.createFromApiListResponse(categories) })),
          catchError((error) => of(CategoriesActions.loadCategoriesFailure({ error})))
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.createCategory),
      withLatestFrom(this.categoriesFacade.categories$),
      map(([action, categories]) => ({ ...action, categories })),
      mergeMap((action) => this.categoriesApiService.create(CategoriesFactories.createToApiRequest(action.category))
        .pipe(
          tap((category) => this.snackBar.open(`Category ${category.name} has been added`, 'Close')),
          map((category) => CategoriesActions.createCategorySuccess({ category: CategoriesFactories.createFromApiResponse(category, action.categories) })),
          catchError((error) => of(CategoriesActions.createCategoryFailure({ error})))
        )
      )
    )
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.updateCategory),
      withLatestFrom(this.categoriesFacade.categories$),
      map(([action, categories]) => ({ ...action, categories })),
      mergeMap((action) => this.categoriesApiService.update(CategoriesFactories.createToApiRequest(action.category))
        .pipe(
          tap((category) => this.snackBar.open(`Category ${category.name} has been updated`, 'Close')),
          map((category) => CategoriesActions.updateCategorySuccess({category: CategoriesFactories.createFromApiResponse(category, action.categories)})),
          catchError((error) => of(CategoriesActions.updateCategoryFailure({ error})))
        )
      )
    )
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.deleteCategory),
      mergeMap((action) => this.categoriesApiService.delete(CategoriesFactories.createToApiRequest(action.category))
        .pipe(
          tap((category) => this.snackBar.open(`Category ${category.name} has been removed`, 'Close')),
          map((category) => {
            return CategoriesActions.deleteCategorySuccess({category});
          }),
          tap(_ => this.router.navigate(['app/budget'])),
          catchError((error) => of(CategoriesActions.deleteCategoryFailure({error})))
        )
      )
    )
  );

  setOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.setOrder),
      mergeMap((action) => this.categoriesApiService.patchOrder(CategoriesFactories.createToApiRequest(action.category))
        .pipe(
          tap((_) => this.snackBar.open(`Category has been moved`, 'Close')),
          map((_) => CategoriesActions.setOrderSuccess({ result: true })),
          catchError((error) => of(CategoriesActions.setOrderFailure({ error})))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private categoriesFacade: CategoriesFacade,
    private categoriesApiService: CategoriesApiService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }
}
