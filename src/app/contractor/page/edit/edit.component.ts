import { Component, OnInit } from '@angular/core';
import {ContractorService} from '../../../core/service/contractor.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ContractorModel} from '../../../core/model/contractor.model';
import {MatSnackBar} from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
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
          this.snackBar.open(`Contractor ${result.name} has been saved`, 'Close');
          this.router.navigate(['app/contractors']);
        });
    }
  }
}
