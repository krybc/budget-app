import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountsFacade, Account} from '@accounts-data-access';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  account$ = this.accountsFacade.selectedAccount$;
  accountsLoaded$ = this.accountsFacade.accountsLoaded$;

  constructor(
    private router: Router,
    private accountsFacade: AccountsFacade,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.accountsFacade.selectAccount(params.id);
    });
  }

  onChange(account: Account) {
    this.accountsFacade.updateAccount(account);
    this.router.navigate(['app/accounts']);
  }
}
