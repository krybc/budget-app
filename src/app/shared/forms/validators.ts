import {AbstractControl, ValidationErrors, Validators as BaseValidators} from '@angular/forms';

export class Validators extends BaseValidators {
  static boolean(control: AbstractControl): ValidationErrors | null {
    return typeof control.value === 'boolean' ? null : { 'boolean': true };
  }
}
