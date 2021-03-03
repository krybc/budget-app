import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as CategoriesActions from './categories.actions';
import {Categories, Category} from './categories.models';

export const CATEGORIES_FEATURE_KEY = 'categories';

export interface State {
  categories: Categories;
  categoriesLoaded: boolean;
  selectedCategoryId: number;
}

export interface CategoriesPartialState {
  readonly [CATEGORIES_FEATURE_KEY]: State;
}

export const categoriesAdapter: EntityAdapter<Category> = createEntityAdapter<Category>();


export const initialState: State = {
  categories: categoriesAdapter.getInitialState(),
  categoriesLoaded: false,
  selectedCategoryId: null,
};

const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategoriesSuccess, (state, {categories}) => ({
    ...state,
    categories: categoriesAdapter.setAll(categories, state.categories),
    categoriesLoaded: true
  })),
  on(CategoriesActions.selectCategory, (state, {id}) => ({
    ...state,
    selectedCategoryId: id
  })),
  on(CategoriesActions.createCategorySuccess, (state, {category}) => ({
    ...state,
    categories: categoriesAdapter.addOne(category, state.categories)
  })),
  on(CategoriesActions.updateCategorySuccess, (state, {category}) => ({
    ...state,
    categories: categoriesAdapter.setOne(category, state.categories)
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return categoriesReducer(state, action);
}
