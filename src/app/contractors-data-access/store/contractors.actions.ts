import {createAction, props} from '@ngrx/store';
import {Contractor} from './contractors.models';

const loadContractors = createAction('[App] Load Contractors');
const loadContractorsSuccess = createAction(
  '[App] Load Contractors Success',
  props<{ contractors: Contractor[] }>()
);
const loadContractorsFailure = createAction(
  '[App] Load Contractors Failure',
  props<{ error: any }>()
);

const selectContractor = createAction(
  '[App] Select Contractor',
  props<{ id: number }>()
);

const createContractor = createAction(
  '[App] Create Contractor',
  props<{ contractor: Contractor }>()
);
const createContractorSuccess = createAction(
  '[App] Create Contractor Success',
  props<{ contractor: Contractor }>()
);
const createContractorFailure = createAction(
  '[App] Create Contractor Failure',
  props<{ error: any }>()
);

const updateContractor = createAction(
  '[App] Update Contractor',
  props<{ contractor: Contractor }>()
);
const updateContractorSuccess = createAction(
  '[App] Update Contractor Success',
  props<{ contractor: Contractor }>()
);
const updateContractorFailure = createAction(
  '[App] Update Contractor Failure',
  props<{ error: any }>()
);

export const ContractorsActions = {
  loadContractors,
  loadContractorsSuccess,
  loadContractorsFailure,
  selectContractor,
  createContractor,
  createContractorSuccess,
  createContractorFailure,
  updateContractor,
  updateContractorSuccess,
  updateContractorFailure
};
