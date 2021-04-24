import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Transaction, TransactionsFacade} from '@transactions-data-access';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
})
export class TransactionAddComponent implements OnInit {

  props$ = combineLatest([
    this.accountsFacade.accounts$,
    this.categoriesFacade.categories$,
    this.contractorsFacade.contractors$,
    this.route.queryParams
  ]).pipe(
    map(([accounts, categories, contractors, queryParams]) => ({
      accounts,
      categories,
      contractors,
      queryParams
    }))
  );

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountsFacade: AccountsFacade,
    private categoriesFacade: CategoriesFacade,
    private contractorsFacade: ContractorsFacade,
    private transactionsFacade: TransactionsFacade,
  ) { }

  ngOnInit() {
  }

  onSave(transaction: Transaction) {
    this.transactionsFacade.createTransaction(transaction);
    this.router.navigate(['app/transactions']);
  }
}
