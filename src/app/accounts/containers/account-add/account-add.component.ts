import {Component, OnInit} from '@angular/core';
import {AccountsFacade, Account} from '@accounts-data-access';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss']
})
export class AccountAddComponent implements OnInit {
  constructor(
    private router: Router,
    private accountsFacade: AccountsFacade,
  ) { }

  ngOnInit() {
  }

  onChange(account: Account) {
    this.accountsFacade.createAccount(account);
    this.router.navigate(['app/accounts']);
  }
}
