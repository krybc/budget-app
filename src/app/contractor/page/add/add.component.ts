import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContractorService} from '../../../core/service/contractor.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contractor-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class ContractorAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    private contractorService: ContractorService,
    private toastrService: ToastrService,
    private router: Router,
    private location: Location,
  ) { }

  ngOnInit() {
    this.createForm();
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

  contractorCreate() {
    if (this.form.valid) {
      this.contractorService.create(this.form.value)
        .subscribe(
          (result) => {
            this.toastrService.success(`Contractor ${result.name} has been added`);
            this.router.navigate(['app/contractors']);
          }
        );
    }
  }

  goBack() {
    this.location.back();
  }
}
