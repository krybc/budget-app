import {Accounts, Account} from './accounts.models';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import {AccountsActions} from './accounts.actions';

export const ACCOUNTS_FEATURE_KEY = 'accounts';

export interface State {
  accounts: Accounts;
  accountsLoaded: boolean;
  selectedAccountId: number;
}

export interface AccountsPartialState {
  readonly [ACCOUNTS_FEATURE_KEY]: State;
}

export const accountsAdapter: EntityAdapter<Account> = createEntityAdapter<Account>();

export const initialState: State = {
  accounts: accountsAdapter.getInitialState(),
  accountsLoaded: false,
  selectedAccountId: null,
};

const accountsReducer = createReducer(
  initialState,
  on(AccountsActions.loadAccountsSuccess, (state, {accounts}) => ({
    ...state,
    accounts: accountsAdapter.setAll(accounts, state.accounts),
    accountsLoaded: true
  })),
  on(AccountsActions.selectAccount, (state, {id}) => ({
    ...state,
    selectedAccountId: id
  })),
  on(AccountsActions.createAccountSuccess, (state, {account}) => ({
    ...state,
    accounts: accountsAdapter.addOne(account, state.accounts)
  })),
  on(AccountsActions.updateAccountSuccess, (state, {account}) => ({
    ...state,
    accounts: accountsAdapter.setOne(account, state.accounts)
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return accountsReducer(state, action);
}
