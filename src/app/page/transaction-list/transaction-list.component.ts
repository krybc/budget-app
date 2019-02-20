import {Component, OnInit, TemplateRef} from '@angular/core';
import {TransactionService} from '../../service/transaction.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CategoryService} from '../../service/category.service';
import {ContractorService} from '../../service/contractor.service';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../service/account.service';
import {FiltersState} from '../../state/filters.state';
import {FiltersStore} from '../../store/filters.store';
import {TransactionModel} from '../../model/transaction.model';
import {CategoryModel} from '../../model/category.model';
import {ContractorModel} from '../../model/contractor.model';
import {AccountModel} from '../../model/account.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
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

  deleteModal(template: TemplateRef<any>, transaction) {
    // this.transactionDeleteModalRef = this.modalService.show(template, {class: 'modal-sm', initialState: { transaction }});
  }

  deleteConfirm(transaction) {
    this.transactionService.delete(transaction._id)
      .subscribe((result) => {
        this.toastrService.success(`Transaction has been deleted`);
        this.prepareTransactionList();
      });
  }

  deleteDecline() {
    // this.transactionDeleteModalRef.hide();
  }

}
