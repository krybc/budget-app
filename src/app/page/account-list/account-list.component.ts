import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../service/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {
  accountList: any[];
  displayedColumns: string[] = ['name', 'amount'];

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.accountService.list()
      .subscribe(response => { this.accountList = response; });
  }

}
