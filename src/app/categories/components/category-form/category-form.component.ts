import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Params} from '@angular/router';
import {Category} from '@categories-data-access';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  @Input()
  get rootCategories() {
    return this._rootCategories;
  }
  set rootCategories(value: Category[]) {
    this._rootCategories = value;
    this.applyQueryParams();
  }
  private _rootCategories: Category[];

  @Input()
  set category(value: Category) {
    this.model = value;
    this.form.patchValue(value);
    this.form.get('parent').setValue(this._rootCategories.find(it => it.id === value.parentId));
  }

  @Input()
  set queryParams(value: Params) {
    this._queryParams = value;
    this.applyQueryParams();
  }
  private _queryParams: Params;

  model: Category;
  @Output() changed = new EventEmitter<Category>();
  form: FormGroup;

  constructor() {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.form = new FormGroup({
      parent: new FormControl(null),
      type: new FormControl(1, [
        Validators.required
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      order: new FormControl(1, [
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const item = {
        ...this.model
        , ...this.form.value
        , parentId: this.form.get('parent').value ? this.form.get('parent').value.id : null
      };
      delete item.parent;
      this.changed.emit(item);
    }
  }

  private applyQueryParams() {
    if (this.rootCategories && this._queryParams && this._queryParams.parent) {
      const parent = this.rootCategories.find(it => it.id === parseInt(this._queryParams.parent, 10));
      if (parent) {
        this.form.get('parent').setValue(parent);
        this.form.get('type').setValue(parent.type);
      }
    }
  }
}
