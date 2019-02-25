import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryGroupService} from '../../../core/service/category-group.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

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
    private toastrService: ToastrService,
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
            this.toastrService.success(`Group ${result.name} has been created`);
            this.router.navigate(['app/budget']);
          }
        );
    }
  }

}
