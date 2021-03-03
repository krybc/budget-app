import {CONTRACTORS_FEATURE_KEY, contractorsAdapter, ContractorsPartialState, State} from './contractors.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const getContractorsState = createFeatureSelector<ContractorsPartialState, State>(
  CONTRACTORS_FEATURE_KEY
);

export const contractorsSelectors = contractorsAdapter.getSelectors();

export const getContractors = createSelector(
  getContractorsState,
  (state: State) => contractorsSelectors.selectAll(state.contractors)
);
export const isContractorsLoaded = createSelector(
  getContractorsState,
  (state: State) => state.contractorsLoaded
);

export const getSelectedContractorId = createSelector(
  getContractorsState,
  (state: State) => state.selectedContractorId
);

export const getSelectedContractor = createSelector(
  getContractorsState,
  (state: State) => state.contractors.entities[state.selectedContractorId]
);
