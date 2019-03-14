import {Component, OnInit, TemplateRef} from '@angular/core';
import {TransactionService} from '../../../core/service/transaction.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CategoryService} from '../../../core/service/category.service';
import {ContractorService} from '../../../core/service/contractor.service';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../../core/service/account.service';
import {FiltersState} from '../../../core/state/filters.state';
import {FiltersStore} from '../../../core/store/filters.store';
import {TransactionModel} from '../../../core/model/transaction.model';
import {CategoryModel} from '../../../core/model/category.model';
import {ContractorModel} from '../../../core/model/contractor.model';
import {AccountModel} from '../../../core/model/account.model';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../../../shared/component/dialog/dialog.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactionList: TransactionModel[];
  categoryList: CategoryModel[];
  contractorList: ContractorModel[];
  accountList: AccountModel[];
  filters: FiltersState;

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private contractorService: ContractorService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
    private filtersStore: FiltersStore,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.prepareCategoryList();
    this.prepareContractorList();
    this.prepareAccountList();

    this.filtersStore.state$.subscribe(filters => {
      this.filters = filters;
      this.prepareTransactionList();
    });
  }

  prepareCategoryList() {
    this.categoryService.tree()
      .subscribe((result) => this.categoryList = result);
  }

  prepareContractorList() {
    this.contractorService.list()
      .subscribe((result) => this.contractorList = result);
  }

  prepareAccountList() {
    this.accountService.list()
      .subscribe((result) => this.accountList = result);
  }

  prepareTransactionList() {
    this.transactionService.list({...this.filters})
      .subscribe((result) => {
        this.transactionList = result;
      });
  }

  public delete(transaction: TransactionModel) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: 'Do you want to delete the transaction?',
        model: transaction
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.transactionService.delete(transaction.id)
          .subscribe(result => {
            this.prepareTransactionList();
            this.toastrService.success('Transaction has been deleted');
          });
      }
    });
  }
}
