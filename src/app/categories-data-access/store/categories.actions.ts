import {createAction, props} from '@ngrx/store';
import {Category} from './categories.models';

export const loadCategories = createAction('[App] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[App] Load Categories Success',
  props<{ categories: Category[] }>()
);
export const loadCategoriesFailure = createAction(
  '[App] Load Categories Failure',
  props<{ error: any }>()
);

export const selectCategory = createAction(
  '[App] Select Category',
  props<{ id: number }>()
);

export const createCategory = createAction(
  '[App] Create Category',
  props<{ category: Category }>()
);
export const createCategorySuccess = createAction(
  '[App] Create Category Success',
  props<{ category: Category }>()
);
export const createCategoryFailure = createAction(
  '[App] Create Category Failure',
  props<{ error: any }>()
);

export const updateCategory = createAction(
  '[App] Update Category',
  props<{ category: Category }>()
);
export const updateCategorySuccess = createAction(
  '[App] Update Category Success',
  props<{ category: Category }>()
);
export const updateCategoryFailure = createAction(
  '[App] Update Category Failure',
  props<{ error: any }>()
);

export const deleteCategory = createAction(
  '[App] Delete Category',
  props<{ category: Category }>()
);
export const deleteCategorySuccess = createAction(
  '[App] Delete Category Success',
  props<{ category: Category }>()
);
export const deleteCategoryFailure = createAction(
  '[App] Delete Category Failure',
  props<{ error: any }>()
);
