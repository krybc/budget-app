import {Contractors} from './contractors.models';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Contractor} from './contractors.models';
import {Action, createReducer, on} from '@ngrx/store';
import {ContractorsActions} from './contractors.actions';

export const CONTRACTORS_FEATURE_KEY = 'contractors';

export interface State {
  contractors: Contractors;
  contractorsLoaded: boolean;
  selectedContractorId: number;
}

export interface ContractorsPartialState {
  readonly [CONTRACTORS_FEATURE_KEY]: State;
}

export const contractorsAdapter: EntityAdapter<Contractor> = createEntityAdapter<Contractor>();

export const initialState: State = {
  contractors: contractorsAdapter.getInitialState(),
  contractorsLoaded: false,
  selectedContractorId: null,
};

const contractorsReducer = createReducer(
  initialState,
  on(ContractorsActions.loadContractorsSuccess, (state, {contractors}) => ({
    ...state,
    contractors: contractorsAdapter.setAll(contractors, state.contractors),
    contractorsLoaded: true
  })),
  on(ContractorsActions.selectContractor, (state, {id}) => ({
    ...state,
    selectedContractorId: id
  })),
  on(ContractorsActions.createContractorSuccess, (state, {contractor}) => ({
    ...state,
    contractors: contractorsAdapter.addOne(contractor, state.contractors)
  })),
  on(ContractorsActions.updateContractorSuccess, (state, {contractor}) => ({
    ...state,
    contractors: contractorsAdapter.setOne(contractor, state.contractors)
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return contractorsReducer(state, action);
}
