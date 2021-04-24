import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TransactionsFacade, Transaction} from '@transactions-data-access';
import {combineLatest, Subscription} from 'rxjs';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss'],
})
export class TransactionEditComponent implements OnInit, OnDestroy {
  transactionsLoaded$ = this.transactionsFacade.transactionsLoaded$;

  props$ = combineLatest([
    this.accountsFacade.accounts$,
    this.categoriesFacade.categories$,
    this.contractorsFacade.contractors$,
    this.route.queryParams,
    this.transactionsFacade.selectedTransactions$
  ]).pipe(
    map(([accounts, categories, contractors, queryParams, transaction]) => ({
      accounts,
      categories,
      contractors,
      queryParams,
      transaction
    }))
  );

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
