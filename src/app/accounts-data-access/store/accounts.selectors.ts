import {ACCOUNTS_FEATURE_KEY, accountsAdapter, AccountsPartialState, State} from './accounts.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export const getAccountsState = createFeatureSelector<AccountsPartialState, State>(
  ACCOUNTS_FEATURE_KEY
);
export const accountsSelectors = accountsAdapter.getSelectors();

export const getAccounts = createSelector(
  getAccountsState,
  (state: State) => accountsSelectors.selectAll(state.accounts)
);
export const isAccountsLoaded = createSelector(
  getAccountsState,
  (state: State) => state.accountsLoaded
);

export const getSelectedAccountId = createSelector(
  getAccountsState,
  (state: State) => state.selectedAccountId
);

export const getSelectedAccount = createSelector(
  getAccountsState,
  (state: State) => state.accounts.entities[state.selectedAccountId]
);
