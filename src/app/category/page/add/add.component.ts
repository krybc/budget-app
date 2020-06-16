import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../../core/service/category.service';
import {CategoryGroupService} from '../../../core/service/category-group.service';
import {CategoryGroupModel} from '../../../core/model/category-group.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-category-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  categoryGroup: CategoryGroupModel;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private categoryGroupService: CategoryGroupService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.prepareCategoryGroup(params.group);
    });
  }

  prepareCategoryGroup(id) {
    this.categoryGroupService.get(id)
      .subscribe((result) => {
        this.categoryGroup = result;
        this.createForm();
        this.isLoading = false;
      });
  }

  createForm() {
    this.form = new FormGroup({
      group: new FormControl(this.categoryGroup.id, [
        Validators.required
      ]),
      type: new FormControl(this.categoryGroup.type, [
        Validators.required
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  categoryCreate() {
    if (this.form.valid) {
      this.categoryService.create(this.form.value)
        .subscribe(
          (result) => {
            this.snackBar.open(`Category ${result.name} has been added`, 'Close');
            this.router.navigate(['app/budget']);
          }
        );
    }
  }

}
