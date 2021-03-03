import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as AccountsSelectors from './accounts.selectors';
import * as fromAccounts from './accounts.reducer';
import {Account} from './accounts.models';
import {AccountsActions} from './accounts.actions';

@Injectable({
  providedIn: 'root'
})
export class AccountsFacade {
  accounts$ = this.store.pipe(select(AccountsSelectors.getAccounts));
  accountsLoaded$ = this.store.pipe(select(AccountsSelectors.isAccountsLoaded));
  selectedAccount$ = this.store.pipe(select(AccountsSelectors.getSelectedAccount));

  constructor(
    private store: Store<fromAccounts.AccountsPartialState>
  ) {
  }

  loadAccounts() {
    this.store.dispatch(AccountsActions.loadAccounts());
  }

  selectAccount(id: number) {
    this.store.dispatch(AccountsActions.selectAccount({id}));
  }

  createAccount(account: Account) {
    this.store.dispatch(AccountsActions.createAccount({account}));
  }

  updateAccount(account: Account) {
    this.store.dispatch(AccountsActions.updateAccount({account}));
  }
}
