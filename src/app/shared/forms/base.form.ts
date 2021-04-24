import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

import { isEqual, toPlainObject } from 'lodash';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
export abstract class BaseForm<T> {
  public value: T;
  protected _form: FormGroup;
  protected _changes = new Subject<T>();
  public changes$ = this._changes.asObservable();

  protected constructor(
    protected _formBuilder: FormBuilder
  ) {
    this._form = this.initForm();
    this.initFormValueObserver();
  }

  public init(value?: Partial<T>): FormGroup {
    this._form = this.initForm(value);
    this.initFormValueObserver();

    return this._form;
  }

  protected initFormValueObserver(): void {
    this._form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.handleChanges(this.handleFormChanges(value));
      });
  }

  protected abstract initForm(value?: Partial<T>): FormGroup;

  public patchValue(value: T): void {
    if (!isEqual(toPlainObject(value), toPlainObject(this.value)) && Object(value) !== this.value) {
      this.value = value;
      this.patchFormValue(value);
    }
  }

  protected abstract patchFormValue(value: T);

  protected abstract handleFormChanges(value: T | Partial<T>): T;

  protected handleChanges(value: T): void {
    if (this.value !== undefined) {
      this._changes.next(value);
    }
    this.value = value;
  }

  get form(): FormGroup {
    return this._form;
  }

  get isValid(): boolean {
    return this._form.valid;
  }
}
