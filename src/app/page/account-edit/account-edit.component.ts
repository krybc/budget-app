import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../../service/account.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '../../model/account.model';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss']
})
export class AccountEditComponent implements OnInit {
  account: any;
  form: FormGroup;

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
    this.account = this.accountService.get(id)
      .subscribe((result) => {
        this.account = result;
        this.createForm();
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
      this.accountService.update(new Account().deserialize({_id: this.account._id, ...this.form.value}))
        .subscribe((result) => {
          this.toastrService.success(`Account ${this.form.value.name} has been saved`);
          this.router.navigate(['app/accounts']);
        });
    }
  }

}
