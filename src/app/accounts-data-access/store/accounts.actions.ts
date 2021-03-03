import {createAction, props} from '@ngrx/store';
import {Account} from './accounts.models';

const loadAccounts = createAction('[App] Load Accounts');
const loadAccountsSuccess = createAction(
  '[App] Load Accounts Success',
  props<{ accounts: Account[] }>()
);
const loadAccountsFailure = createAction(
  '[App] Load Accounts Failure',
  props<{ error: any }>()
);

const selectAccount = createAction(
  '[App] Select Account',
  props<{ id: number }>()
);

const createAccount = createAction(
  '[App] Create Account',
  props<{ account: Account }>()
);
const createAccountSuccess = createAction(
  '[App] Create Account Success',
  props<{ account: Account }>()
);
const createAccountFailure = createAction(
  '[App] Create Account Failure',
  props<{ error: any }>()
);

const updateAccount = createAction(
  '[App] Update Account',
  props<{ account: Account }>()
);
const updateAccountSuccess = createAction(
  '[App] Update Account Success',
  props<{ account: Account }>()
);
const updateAccountFailure = createAction(
  '[App] Update Account Failure',
  props<{ error: any }>()
);

export const AccountsActions = {
  loadAccounts,
  loadAccountsSuccess,
  loadAccountsFailure,
  selectAccount,
  createAccount,
  createAccountSuccess,
  createAccountFailure,
  updateAccount,
  updateAccountSuccess,
  updateAccountFailure
};
