import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {DateTime} from 'luxon';

import {BaseForm, Validators} from '@shared/forms';
import {Transaction} from '@transactions-data-access';

@Injectable()
export class TransactionForm extends BaseForm<Transaction> {
  constructor(_formBuilder: FormBuilder) {
    super(_formBuilder);
  }

  protected initForm(): FormGroup {
    return this._formBuilder.group({
      category: [null, [Validators.required]],
      account: [null, [Validators.required]],
      contractor: [null, [Validators.required,]],
      date: [DateTime.local(), [Validators.required]],
      income: [0],
      expense: [0],
      description: [null]
    });
  }

  protected handleFormChanges(value: Partial<Transaction> | Transaction): Transaction {
    return Object.assign({}, this.value, value, {
      income: value.income ? parseFloat(value.income.toString()) : 0.00,
      expense: value.expense ? parseFloat(value.expense.toString()) : 0.00
    });
  }

  protected patchFormValue(value: Transaction) {
    this._form.patchValue(value, {emitEvent: false});
  }
}
