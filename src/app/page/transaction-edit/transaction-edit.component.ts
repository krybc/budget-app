import {Component, Input, OnInit, TemplateRef} from '@angular/core';
// import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {TransactionService} from '../../service/transaction.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractorService} from '../../service/contractor.service';
import {CategoryService} from '../../service/category.service';
import {AccountService} from '../../service/account.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'YYYY.MM.DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
})
export class TransactionEditComponent implements OnInit {
  categoryList: any;
  contractorList: any[];
  accountList: any[];
  transaction: any;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private contractorService: ContractorService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    const combine = forkJoin(
      this.categoryService.tree(),
      this.contractorService.list(),
      this.accountService.list()
    );

    combine.subscribe((values) => {
      this.categoryList = values[0];
      this.contractorList = values[1];
      this.accountList = values[2];
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
      _id: new FormControl(this.transaction._id, [
        Validators.required
      ]),
      category: new FormControl(this.transaction.category._id, [
        Validators.required
      ]),
      account: new FormControl(this.transaction.account._id, [
        Validators.required
      ]),
      contractor: new FormControl(this.transaction.contractor._id, [
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
      this.transactionService.update(this.form.value)
        .subscribe(
          (result) => {
            const price = (result.income > 0) ? result.income : result.expense;
            this.toastrService.success(`Transaction for ${price} has been saved`);
            this.router.navigate(['app/transactions']);
          }
        );
    }
  }
}
