import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '@shared/ui';
import {Transaction, TransactionsFacade} from '@transactions-data-access';
import {TransactionsFilters} from '@transactions-data-access';
import {AccountsFacade} from '@accounts-data-access';
import {CategoriesFacade} from '@categories-data-access';
import {ContractorsFacade} from '@contractors-data-access';

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
  ) { }

  ngOnInit() {
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
