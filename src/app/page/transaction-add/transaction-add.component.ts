import {Component, Input, OnInit, TemplateRef} from '@angular/core';
// import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, forkJoin, Observable} from 'rxjs';
import {DatePipe} from '@angular/common';
import {TransactionService} from '../../service/transaction.service';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../service/category.service';
import {ContractorService} from '../../service/contractor.service';
import {AccountService} from '../../service/account.service';
import * as moment from 'moment';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter} from '@angular/material-moment-adapter';
import { ContractorModel} from '../../model/contractor.model';
import {map, startWith} from 'rxjs/operators';
import {TransactionModel} from '../../model/transaction.model';
import {plainToClass} from 'class-transformer';
import {CategoryModel} from '../../model/category.model';
import {AccountModel} from '../../model/account.model';
import {CategoryGroupModel} from '../../model/category-group.model';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'YYYY.MM.DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
  useUtc: true
};

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
})
export class TransactionAddComponent implements OnInit {
  categoryList: CategoryGroupModel[];
  contractorList: ContractorModel[];
  contractorListFiltered: Observable<ContractorModel[]>;
  accountList: AccountModel[];
  isLoading: boolean;
  form: FormGroup;
  params: any = {
    category: null,
    contractor: null,
    account: null,
  };

  constructor(
    private categoryService: CategoryService,
    private contractorService: ContractorService,
    private accountService: AccountService,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading = true;

    const combine = forkJoin(
      this.categoryService.tree(),
      this.contractorService.list(),
      this.accountService.list()
    );

    combine.subscribe(([categoryList, contractorList, accountList]: [CategoryGroupModel[], ContractorModel[], AccountModel[]]) => {
      this.categoryList = categoryList;
      this.contractorList = contractorList;
      this.accountList = accountList;

      this.isLoading = false;

      this.createForm();

      this.contractorListFiltered = this.form.get('contractor').valueChanges
        .pipe(
          startWith<string | ContractorModel>(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._contractorFilter(name) : this.contractorList.slice())
        );
    });

    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });
  }

  createForm() {
    this.form = new FormGroup({
      category: new FormControl(this.params.category, [
        Validators.required
      ]),
      account: new FormControl(this.params.account, [
        Validators.required
      ]),
      contractor: new FormControl(this.params.contractor, [
        Validators.required,
      ]),
      date: new FormControl(moment().format('YYYY-MM-DD'), [
        Validators.required
      ]),
      income: new FormControl(null),
      expense: new FormControl(null),
      description: new FormControl(null)
    });
  }

  private _contractorFilter(value: string): ContractorModel[] {
    const filterValue = value.toLowerCase();

    return this.contractorList.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  contractorAutocompleteDisplay(contractor?: ContractorModel): string | undefined {
    return contractor ? contractor.name : undefined;
  }

  transactionCreate() {
    if (this.form.valid) {
      this.transactionService.create(this.form.value)
        .subscribe(
          (result) => {
            const price = (result.income > 0) ? result.income : result.expense;
            this.toastrService.success(`Transaction for ${price} has been created`);
            this.router.navigate(['app/transactions']);
          }
        );
    }
  }
}
