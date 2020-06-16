import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryGroupService} from '../../../core/service/category-group.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-group-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CategoryGroupAddComponent implements OnInit {
  isLoading = true;
  form: FormGroup;
  types = [
    {
      id: 1,
      name: 'Przychody'
    },
    {
      id: 2,
      name: 'Koszty'
    },
  ];

  constructor(
    private categoryGroupService: CategoryGroupService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    this.isLoading = false;
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required
      ]),
      type: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  categoryGroupCreate() {
    if (this.form.valid) {
      this.categoryGroupService.create(this.form.value)
        .subscribe(
          (result) => {
            this.snackBar.open(`Group ${result.name} has been added`, 'Close');
            this.router.navigate(['app/budget']);
          }
        );
    }
  }

}
