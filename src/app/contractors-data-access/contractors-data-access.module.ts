import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import * as fromContractors from './store/contractors.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ContractorsFacade} from './store/contractors.facade';
import {ContractorsEffects} from './store/contractors.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromContractors.CONTRACTORS_FEATURE_KEY,
      fromContractors.reducer
    ),
    EffectsModule.forFeature([ContractorsEffects]),
  ],
  providers: [
    ContractorsFacade,
  ]
})
export class ContractorsDataAccessModule { }
