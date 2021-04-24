import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {BaseForm, Validators} from '@shared/forms';
import {Category} from '@categories-data-access';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable()
export class CategoryForm extends BaseForm<Category> {
  constructor(_formBuilder: FormBuilder) {
    super(_formBuilder);
  }

  protected initForm(value?: Partial<Category>): FormGroup {
    const form = this._formBuilder.group({
      name: [value && value.name ? value.name : null, [Validators.required]],
      parent: [value && value.parent ? value.parent : null],
      type: [value && value.type !== null ? value.type : null],
      sequence: [value && value.sequence ? value.sequence : 1, [Validators.required]],
    });

    form.get('parent').valueChanges
      .pipe(untilDestroyed(this))
      .subscribe((value: Category) => {
      form.get('type').setValue(value.type);
    });

    return form;
  }

  protected handleFormChanges(value: Partial<Category> | Category): Category {
    return { ...this.value, ...value };
  }

  protected patchFormValue(value: Category) {
    this._form.patchValue(value, {emitEvent: false});
  }
}
