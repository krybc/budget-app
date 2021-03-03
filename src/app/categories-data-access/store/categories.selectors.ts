import {createFeatureSelector, createSelector} from '@ngrx/store';
import {CATEGORIES_FEATURE_KEY, CategoriesPartialState, State} from './categories.reducer';
import {categoriesAdapter} from './categories.reducer';

export const getCategoriesState = createFeatureSelector<CategoriesPartialState, State>(
  CATEGORIES_FEATURE_KEY
);

export const categoriesSelectors = categoriesAdapter.getSelectors();

export const getCategories = createSelector(
  getCategoriesState,
  (state: State) => categoriesSelectors.selectAll(state.categories)
);

export const getRootCategories = createSelector(
  getCategoriesState,
  (state: State) => categoriesSelectors.selectAll(state.categories).filter(item => item.parentId === null)
);

export const isCategoriesLoaded = createSelector(
  getCategoriesState,
  (state: State) => state.categoriesLoaded
);

export const getSelectedCategoryId = createSelector(
  getCategoriesState,
  (state: State) => state.selectedCategoryId
);

export const getSelectedCategory = createSelector(
  getCategoriesState,
  (state: State) => state.categories.entities[state.selectedCategoryId]
);
