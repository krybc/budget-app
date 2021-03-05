import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {EffectsModule} from '@ngrx/effects';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    console.log('action', { action, state });
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<unknown>[] = [debug];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({ }),
    StoreDevtoolsModule.instrument({
      maxAge: 24,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
  ],
})
export class DataAccessModule {
  static forRoot(production: boolean): ModuleWithProviders<DataAccessModule> {
    return {
      ngModule: DataAccessModule,
      providers: [
        StoreModule.forRoot(
          {},
          {
            metaReducers: !production ? metaReducers : metaReducers,
            runtimeChecks: {
              strictActionImmutability: true,
              strictStateImmutability: true
            }
          }
        ).providers,
        !production ? StoreDevtoolsModule.instrument().providers : StoreDevtoolsModule.instrument().providers
      ]
    };
  }
}
