import {Component, OnInit, TemplateRef} from '@angular/core';
import {TransactionService} from '../../service/transaction.service';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';
import {CategoryService} from '../../service/category.service';
import {ContractorService} from '../../service/contractor.service';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../service/account.service';
import * as moment from 'moment';
import {BehaviorSubject} from 'rxjs';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactionList: any[];
  categoryList: any[];
  contractorList: any[];
  accountList: any[];
  filters: any = {
    category: null,
    month: moment(),
    contractor: null
  };
  filtersSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    category: null,
    month: moment(),
    contractor: null
  });

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private contractorService: ContractorService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
    private deviceDetector: DeviceDetectorService,
  ) { }

  ngOnInit() {
    this.prepareCategoryList();
    this.prepareContractorList();
    this.prepareAccountList();

    this.filtersSubject.subscribe((filters) => {
      this.filters = filters;
      this.prepareTransactionList();
    });

  }

  prepareCategoryList() {
    this.categoryService.tree()
      .subscribe((result) => {
        this.categoryList = result;
      });
  }

  prepareContractorList() {
    this.contractorService.list()
      .subscribe((result) => {
        this.contractorList = result;
      });
  }

  prepareAccountList() {
    this.accountService.list()
      .subscribe((result) => {
        this.accountList = result;
      });
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
    console.log(transaction);
    this.transactionService.delete(transaction._id)
      .subscribe((result) => {
        this.toastrService.success(`Transakcja została usunięta`);
        this.prepareTransactionList();
      });
  }

  deleteDecline() {
    // this.transactionDeleteModalRef.hide();
  }

}
