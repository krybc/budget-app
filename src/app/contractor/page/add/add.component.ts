import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContractorService} from '../../../core/service/contractor.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-contractor-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class ContractorAddComponent implements OnInit {
  form: FormGroup;

  constructor(
    private contractorService: ContractorService,
    private snackBar: MatSnackBar,
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
            this.snackBar.open(`Contractor ${result.name} has been added`, 'Close');
            this.router.navigate(['app/contractors']);
          }
        );
    }
  }
}
