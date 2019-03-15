import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../../core/service/account.service';
import {Router} from '@angular/router';
import {AccountModel} from '../../../core/model/account.model';
import {plainToClass} from 'class-transformer';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-account-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AccountAddComponent implements OnInit {
  public isLoading = true;
  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    this.isLoading = false;
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      amount: new FormControl(null, [
        Validators.required,
        Validators.pattern(/\d{1,}/)
      ])
    });
  }

  accountCreate() {
    if (this.form.valid) {
      this.accountService.create(plainToClass(AccountModel, this.form.value as Object))
        .subscribe(
          (result) => {
            this.snackBar.open(`Account ${result.name} has been added`, 'Close');
            this.router.navigate(['app/accounts']);
          }
        );
    }
  }
}
