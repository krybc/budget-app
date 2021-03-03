import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account} from '@accounts-data-access';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  @Input()
  set account(value: Account) {
    this.model = value;
    this.form.patchValue(value);
  }

  model: Account;
  @Output() changed = new EventEmitter<Account>();
  form: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      amount: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.changed.emit({...this.model, ...this.form.value, amount: parseFloat(this.form.get('amount').value)});
    }
  }
}
