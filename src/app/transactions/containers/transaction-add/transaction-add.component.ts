import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Transaction, TransactionsFacade} from '@transactions-data-access';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
})
export class TransactionAddComponent implements OnInit {
  params$ = this.route.queryParams;
  accounts$ = this.accountsFacade.accounts$;
  categories$ = this.categoriesFacade.categories$;
  contractors$ = this.contractorsFacade.contractors$;

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
