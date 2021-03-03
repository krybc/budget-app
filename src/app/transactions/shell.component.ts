import {Component, OnInit} from '@angular/core';
import {TransactionsFacade} from '@transactions-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';
import {AccountsFacade} from '@accounts-data-access';


@Component({
  template: '<router-outlet></router-outlet>',
})
export class ShellComponent implements OnInit {
  constructor(
    private accountsFacade: AccountsFacade,
    private categoriesFacade: CategoriesFacade,
    private contractorsFacade: ContractorsFacade,
    private transactionsFacade: TransactionsFacade,
  ) { }

  ngOnInit() {
    this.accountsFacade.loadAccounts();
    this.categoriesFacade.loadCategories();
    this.contractorsFacade.loadContractors();
    this.transactionsFacade.initTransactions();
  }
}
