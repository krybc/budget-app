import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {CategoryGroupService} from '../../service/category-group.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {CategoryGroupModel} from '../../model/category-group.model';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-category-group-edit',
  templateUrl: './category-group-edit.component.html',
  styleUrls: ['./category-group-edit.component.scss']
})
export class CategoryGroupEditComponent implements OnInit {
  categoryGroup: CategoryGroupModel;
  isLoading: boolean;
  form: FormGroup;

  constructor(
    private categoryGroupService: CategoryGroupService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.prepareCategoryGroup(params.id);
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
      id: new FormControl(this.categoryGroup.id, [
        Validators.required
      ]),
      name: new FormControl(this.categoryGroup.name, [
        Validators.required
      ]),
      type: new FormControl(this.categoryGroup.type, [
        Validators.required
      ]),
    });
  }

  categoryGroupUpdate() {
    if (this.form.valid) {
      this.categoryGroupService.update(this.form.value)
        .subscribe(
          (result) => {
            this.toastrService.success(`Group ${result.name} has been saved`);
            this.router.navigate(['app/budget']);
          }
        );
    }
  }

}
