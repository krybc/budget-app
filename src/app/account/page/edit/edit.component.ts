import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../../core/service/account.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountModel} from '../../../core/model/account.model';
import {plainToClass} from 'class-transformer';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-account-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  account: AccountModel;
  form: FormGroup;
  isLoading = true;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
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
          this.snackBar.open(`Account ${result.name} has been saved`, 'Close');
          this.router.navigate(['app/accounts']);
        });
    }
  }

}
