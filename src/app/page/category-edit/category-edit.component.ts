import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material';
import {CategoryModel} from '../../model/category.model';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit {
  category: CategoryModel;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private dialog: MatDialog,
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
      this.categoryService.update({id: this.category.id, ...this.form.value})
        .subscribe((result) => {
          this.toastrService.success(`Category ${this.form.value.name} has been saved`);
          this.router.navigate(['app/budget']);
        });
    }
  }

  categoryDelete() {
    this.categoryService.delete(this.category.id)
      .subscribe(result => {
        this.toastrService.success(`Category ${this.category.name} has been deleted`);
        this.router.navigate(['app/budget']);
      });
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
  //     width: '250px',
  //     data: {name: this.name, animal: this.animal}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.animal = result;
  //   });
  // }

}
