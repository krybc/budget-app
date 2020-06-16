import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../../core/service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CategoryModel} from '../../../core/model/category.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  category: CategoryModel;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.prepareCategory(params.id);
    });
  }

  prepareCategory(id) {
    this.categoryService.get(id)
      .subscribe((result) => {
        this.category = result;
        this.createForm();

        this.isLoading = false;
      });
  }

  createForm() {
    this.form = new FormGroup({
      name: new FormControl(this.category.name, [
        Validators.required
      ]),
    });
  }

  categoryUpdate() {
    if (this.form.valid) {
      this.categoryService.update(Object.assign(this.category, this.form.value))
        .subscribe((result) => {
          this.snackBar.open(`Category ${this.form.value.name} has been saved`, 'Close');
          this.router.navigate(['app/budget']);
        });
    }
  }
}
