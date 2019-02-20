import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContractorService} from '../../service/contractor.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {plainToClass} from 'class-transformer';
import {ContractorModel} from '../../model/contractor.model';

@Component({
  selector: 'app-contractor-add',
  templateUrl: './contractor-add.component.html',
  styleUrls: ['./contractor-add.component.scss']
})
export class ContractorAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    private contractorService: ContractorService,
    private toastrService: ToastrService,
    private router: Router,
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

}
