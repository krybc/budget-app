import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AccountsFacade, Account} from '@accounts-data-access';

@Component({
  selector: 'app-account-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit {
  accounts$: Observable<Account[]> = this.accountsFacade.accounts$;
  accountsLoaded$ = this.accountsFacade.accountsLoaded$;

  displayedColumns: string[] = ['name', 'amount'];

  constructor(
    private accountsFacade: AccountsFacade,
  ) { }

  ngOnInit() {
  }
}
