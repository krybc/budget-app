import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {CategoriesEffects} from './store/categories.effects';
import {CategoriesFacade} from './store/categories.facade';
import * as fromCategories from './store/categories.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCategories.CATEGORIES_FEATURE_KEY,
      fromCategories.reducer
    ),
    EffectsModule.forFeature([CategoriesEffects]),
  ],
  providers: [
    CategoriesFacade,
  ]
})
export class CategoriesDataAccessModule { }
