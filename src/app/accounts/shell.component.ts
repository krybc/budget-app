import {Component, OnInit} from '@angular/core';
import {AccountsFacade} from '@accounts-data-access';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class ShellComponent implements OnInit {
  constructor(
    private accountsFacade: AccountsFacade
  ) { }

  ngOnInit() {
    this.accountsFacade.loadAccounts();
  }
}
