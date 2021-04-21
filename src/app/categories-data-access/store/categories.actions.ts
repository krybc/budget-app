import {createAction, props} from '@ngrx/store';
import {Category} from './categories.models';

export const loadCategories = createAction('[App] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Categories] Load Categories Success',
  props<{ categories: Category[] }>()
);
export const loadCategoriesFailure = createAction(
  '[Categories] Load Categories Failure',
  props<{ error: any }>()
);

export const selectCategory = createAction(
  '[Categories] Select Category',
  props<{ id: number }>()
);

export const createCategory = createAction(
  '[Categories] Create Category',
  props<{ category: Category }>()
);
export const createCategorySuccess = createAction(
  '[Categories] Create Category Success',
  props<{ category: Category }>()
);
export const createCategoryFailure = createAction(
  '[Categories] Create Category Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[Categories] Update Category',
  props<{ category: Category }>()
);
export const updateCategorySuccess = createAction(
  '[Categories] Update Category Success',
  props<{ category: Category }>()
);
export const updateCategoryFailure = createAction(
  '[Categories] Update Category Failure',
  props<{ error: any }>()
);

export const deleteCategory = createAction(
  '[Categories] Delete Category',
  props<{ category: Category }>()
);
export const deleteCategorySuccess = createAction(
  '[Categories] Delete Category Success',
  props<{ category: Category }>()
);
export const deleteCategoryFailure = createAction(
  '[Categories] Delete Category Failure',
  props<{ error: any }>()
);

export const setOrder = createAction(
  '[Categories] Set Order',
  props<{ category: Category }>()
);
export const setOrderSuccess = createAction(
  '[Categories] Set Order Success',
  props<{ result: boolean }>()
);
export const setOrderFailure = createAction(
  '[Categories] Set Order Failure',
  props<{ error: any }>()
);
