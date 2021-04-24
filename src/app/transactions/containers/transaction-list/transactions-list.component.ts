import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '@shared/ui';
import {Transaction, TransactionsFacade} from '@transactions-data-access';
import {TransactionsFilters} from '@transactions-data-access';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';
import {ActivatedRoute} from '@angular/router';
import {DateTime} from 'luxon';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactions$ = this.transactionsFacade.filteredTransactions$;
  filters$ = this.transactionsFacade.filters$;
  accounts$ = this.accountsFacade.accounts$;
  categories$ = this.categoriesFacade.categories$;
  contractors$ = this.contractorsFacade.contractors$;

  constructor(
    private accountsFacade: AccountsFacade,
    private categoriesFacade: CategoriesFacade,
    private contractorsFacade: ContractorsFacade,
    private transactionsFacade: TransactionsFacade,
    public dialog: MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    combineLatest(([
      this.route.queryParams,
      this.categoriesFacade.categories$,
    ]))
      .subscribe(([queryParams, categories]) => {
        let filters = null;
        if (queryParams.month) {
          filters = { ...filters, month: DateTime.fromISO(queryParams.month) };
        }
        if (queryParams.category) {
          filters = { ...filters, category: categories.find(it => it.id === parseInt(queryParams.category, 10)) };
        }

        if (filters) {
          this.transactionsFacade.setFilters(filters);
        }
        console.log(queryParams, filters);
      });
  }

  onFiltersChange(filters: TransactionsFilters) {
    this.transactionsFacade.setFilters(filters);
  }

  public delete(transaction: Transaction) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: 'Do you want to delete the transaction?',
        model: transaction
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.transactionsFacade.deleteTransaction(transaction);
      }
    });
  }
}
