import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../service/account.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountModel} from '../../model/account.model';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  account: AccountModel;
  form: FormGroup;
  isLoading = true;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.prepareAccount(params.id);
    });
  }

  prepareAccount(id) {
    this.accountService.get(id)
      .subscribe((result) => {
        this.account = result;
        this.createForm();
        this.isLoading = false;
      });
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.account.name, [
        Validators.required
      ]),
      amount: new FormControl(this.account.amount),
    });
  }

  accountUpdate() {
    if (this.form.valid) {
      this.accountService.update(plainToClass(AccountModel, {id: this.account.id, ...this.form.value} as Object))
        .subscribe((result) => {
          this.toastrService.success(`Account ${this.form.value.name} has been saved`);
          this.router.navigate(['app/accounts']);
        });
    }
  }

}
