import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Contractor} from '@contractors-data-access';

@Component({
  selector: 'app-contractor-form',
  templateUrl: './contractor-form.component.html',
  styleUrls: ['./contractor-form.component.scss']
})
export class ContractorFormComponent implements OnInit {
  @Input()
  set contractor(value: Contractor) {
    this.model = value;
    this.form.patchValue(value);
  }

  model: Contractor;
  @Output() changed = new EventEmitter<Contractor>();
  form: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      street: new FormControl(null),
      city: new FormControl(null)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.changed.emit({...this.model, ...this.form.value});
    }
  }
}
