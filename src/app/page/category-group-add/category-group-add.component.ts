import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {CategoryGroupService} from '../../service/category-group.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {plainToClass} from 'class-transformer';
import {CategoryGroupModel} from '../../model/category-group.model';

@Component({
  selector: 'app-category-group-add',
  templateUrl: './category-group-add.component.html',
  styleUrls: ['./category-group-add.component.scss']
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
