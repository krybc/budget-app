import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Params} from '@angular/router';
import {Category} from '@categories-data-access';
import {CategoryForm} from '../../forms/category.form';

interface Props {
  rootCategories: Category[];
  queryParams?: Params;
  category?: Category;
}

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  providers: [CategoryForm]
})
export class CategoryFormComponent implements OnChanges {
  @Input()
  set props(value: Props) {
    this.handleProps(value);
  }

  get rootCategories() {
    return this._rootCategories;
  }
  private _rootCategories: Category[];

  set queryParams(value: Params) {
    if (value.parent) {
      this._queryParams = { ...this._queryParams, parent: parseInt(value.parent, 10) };
    }
  }
  private _queryParams: Params;

  model: Category;
  @Output() changed = new EventEmitter<Category>();
  form: FormGroup;

  constructor(
    private categoryForm: CategoryForm,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._rootCategories) {
      this.applyQueryParams();

      this.form = this.categoryForm.init(this.model);
    }
  }

  onSubmit() {
    if (this.categoryForm.isValid) {
      this.changed.emit(this.categoryForm.value);
    }
  }

  private applyQueryParams() {
    if (this._queryParams && this._queryParams.parent) {
      const parent = this.rootCategories.find(it => it.id === this._queryParams.parent);
      this.model = {
        ...this.model,
        parent: parent ? parent : null,
        type: parent ? parent.type : null,
      };
    }
  }

  private handleProps(value: Props): void {
    if (value.rootCategories) {
      this._rootCategories = value.rootCategories;
    }
    if (value.queryParams) {
      this.queryParams = value.queryParams;
    }
    if (value.category) {
      this.model = value.category;
    }
  }
}
