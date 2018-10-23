import { Component, OnInit } from '@angular/core';
import {ContractorService} from '../../service/contractor.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-contractor-edit',
  templateUrl: './contractor-edit.component.html',
  styleUrls: ['./contractor-edit.component.scss']
})
export class ContractorEditComponent implements OnInit {
  contractor: any;
  form: FormGroup;

  constructor(
    private contractorService: ContractorService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.prepareContractor(params.id);
    });

  }

  prepareContractor(id) {
    this.contractor = this.contractorService.get(id)
      .subscribe((result) => {
        this.contractor = result;
        this.createForm();
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
      this.contractorService.update({_id: this.contractor._id, ...this.form.value})
        .subscribe((result) => {
          this.toastrService.success(`Contractor ${this.form.value.name} has been saved`);
          this.router.navigate(['app/contractors']);
        });
    }
  }

}
