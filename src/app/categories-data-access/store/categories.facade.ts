import {Injectable} from '@angular/core';
import {Category} from './categories.models';
import {select, Store} from '@ngrx/store';
import * as CategoriesSelectors from './categories.selectors';
import * as fromCategories from './categories.reducer';
import {createCategory, deleteCategory, loadCategories, selectCategory, setOrder, updateCategory} from './categories.actions';

@Injectable({
  providedIn: 'root'
})
export class CategoriesFacade {
  categories$ = this.store.pipe(select(CategoriesSelectors.getCategories));
  rootCategories$ = this.store.pipe(select(CategoriesSelectors.getRootCategories));
  categoriesLoaded$ = this.store.pipe(select(CategoriesSelectors.isCategoriesLoaded));
  selectedCategory$ = this.store.pipe(select(CategoriesSelectors.getSelectedCategory));

  constructor(
    private store: Store<fromCategories.CategoriesPartialState>
  ) {
    this.categories$.subscribe(value => console.log(value));
  }

  loadCategories() {
    this.store.dispatch(loadCategories());
  }

  selectCategory(id: number) {
    this.store.dispatch(selectCategory({id}));
  }

  createCategory(category: Category) {
    this.store.dispatch(createCategory({category}));
  }

  updateCategory(category: Category) {
    this.store.dispatch(updateCategory({category}));
  }

  deleteCategory(category: Category) {
    this.store.dispatch(deleteCategory({category}));
  }

  changeOrder(category: Category) {
    this.store.dispatch(setOrder({ category }));
  }
}
