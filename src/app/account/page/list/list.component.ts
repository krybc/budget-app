import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../core/service/account.service';
import {AccountModel} from '../../../core/model/account.model';

@Component({
  selector: 'app-account-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AccountListComponent implements OnInit {
  accountList: AccountModel[];
  displayedColumns: string[] = ['name', 'amount'];
  public isLoading = true;

  constructor(
    private accountService: AccountService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.accountService.list()
      .subscribe(response => {
        this.accountList = response;
        this.isLoading = false;
      });
  }

}
