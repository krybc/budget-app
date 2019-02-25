import { Component, OnInit } from '@angular/core';
import {ContractorService} from '../../../core/service/contractor.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ContractorModel} from '../../../core/model/contractor.model';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-contractor-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class ContractorEditComponent implements OnInit {
  contractor: ContractorModel;
  form: FormGroup;
  isLoading = true;

  constructor(
    private contractorService: ContractorService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.prepareContractor(params.id);
    });

  }

  prepareContractor(id) {
    this.contractorService.get(id)
      .subscribe((result) => {
        this.contractor = result;
        this.createForm();
        this.isLoading = false;
      });
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.contractor.name, [
        Validators.required
      ]),
      street: new FormControl(this.contractor.street),
      city: new FormControl(this.contractor.city)
    });
  }

  contractorUpdate() {
    if (this.form.valid) {
      this.contractorService.update({id: this.contractor.id, ...this.form.value})
        .subscribe((result) => {
          this.toastrService.success(`Contractor ${this.form.value.name} has been saved`);
          this.router.navigate(['app/contractors']);
        });
    }
  }

  goBack() {
    this.location.back();
  }
}
