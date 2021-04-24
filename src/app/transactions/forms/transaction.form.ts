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

  protected initForm(value?: Partial<Transaction>): FormGroup {
    return this._formBuilder.group({
      category: [value && value.category ? value.category : null, [Validators.required]],
      account: [value && value.account ? value.account : null, [Validators.required]],
      contractor: [value && value.contractor ? value.contractor : null, [Validators.required,]],
      date: [value && value.date ? value.date : DateTime.local(), [Validators.required]],
      income: [value && value.income ? value.income : 0],
      expense: [value && value.expense ? value.expense : 0],
      description: [value && value.description ? value.description : null]
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
