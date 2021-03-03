import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionsFacade, Transaction} from '@transactions-data-access';
import {Subscription} from 'rxjs';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';


@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss'],
})
export class TransactionEditComponent implements OnInit, OnDestroy {
  params$ = this.route.queryParams;
  accounts$ = this.accountsFacade.accounts$;
  categories$ = this.categoriesFacade.categories$;
  contractors$ = this.contractorsFacade.contractors$;
  transaction$ = this.transactionsFacade.selectedTransactions$;
  transactionsLoaded$ = this.transactionsFacade.transactionsLoaded$;

  private paramsSubscription$: Subscription;

  constructor(
    private router: Router,
    private accountsFacade: AccountsFacade,
    private categoriesFacade: CategoriesFacade,
    private contractorsFacade: ContractorsFacade,
    private transactionsFacade: TransactionsFacade,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.paramsSubscription$ = this.route.params.subscribe((params) => {
      this.transactionsFacade.selectTransaction(params.id);
    });
  }

  onSave(transaction: Transaction) {
    this.transactionsFacade.updateTransaction(transaction);
    this.router.navigate(['app/transactions']);
  }

  ngOnDestroy() {
    this.paramsSubscription$.unsubscribe();
  }
}
