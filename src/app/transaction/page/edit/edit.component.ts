import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forkJoin} from 'rxjs';
import {TransactionService} from '../../../core/service/transaction.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractorService} from '../../../core/service/contractor.service';
import {CategoryService} from '../../../core/service/category.service';
import {AccountService} from '../../../core/service/account.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {CategoryGroupModel} from '../../../core/model/category-group.model';
import {ContractorModel} from '../../../core/model/contractor.model';
import {AccountModel} from '../../../core/model/account.model';
import {TransactionModel} from '../../../core/model/transaction.model';
import {LuxonDateAdapter} from '../../../shared/util/luxon-date-adapter';
import {MatSnackBar} from '@angular/material/snack-bar';

export const MY_FORMATS = {
  parse: {
    dateInput: 'yyyy.LL.dd',
  },
  display: {
    dateInput: 'yyyy.LL.dd',
    monthYearLabel: 'LLL yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'LLL yyyy'
  },
};

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: LuxonDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class TransactionEditComponent implements OnInit {
  categoryList: CategoryGroupModel[];
  contractorList: ContractorModel[];
  accountList: AccountModel[];
  transaction: TransactionModel;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private contractorService: ContractorService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    const combine = forkJoin(
      this.categoryService.tree(),
      this.contractorService.list(),
      this.accountService.list()
    );

    combine.subscribe(([categoryList, contractorList, accountList]: [CategoryGroupModel[], ContractorModel[], AccountModel[]]) => {
      this.categoryList = categoryList;
      this.contractorList = contractorList;
      this.accountList = accountList;
    });

    this.route.params.subscribe((params) => {
      this.prepareTransaction(params.id);
    });
  }

  prepareTransaction(id) {
    this.transactionService.get(id)
      .subscribe((result) => {
        this.transaction = result;
        this.createForm();
        this.isLoading = false;
      });
  }

  createForm() {
    this.form = new FormGroup({
      category: new FormControl(this.transaction.category, [
        Validators.required
      ]),
      account: new FormControl(this.transaction.account, [
        Validators.required
      ]),
      contractor: new FormControl(this.transaction.contractor, [
        Validators.required
      ]),
      date: new FormControl(this.transaction.date, [
        Validators.required
      ]),
      income: new FormControl(this.transaction.income),
      expense: new FormControl(this.transaction.expense),
      description: new FormControl(this.transaction.description)
    });
  }

  transactionUpdate() {
    if (this.form.valid) {
      this.transactionService.update({id: this.transaction.id, ...this.form.value, ...{category: this.form.value.category.id, contractor: this.form.value.contractor.id, account: this.form.value.account.id}})
        .subscribe(
          (result) => {
            const price = (result.income > 0) ? result.income : result.expense;
            this.snackBar.open(`Transaction for ${price} has been saved`, 'Close');
            this.router.navigate(['app/transactions']);
          }
        );
    }
  }
}
