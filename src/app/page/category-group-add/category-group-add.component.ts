import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {CategoryGroupService} from '../../service/category-group.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-group-add',
  templateUrl: './category-group-add.component.html',
  styleUrls: ['./category-group-add.component.scss']
})
export class CategoryGroupAddComponent implements OnInit {
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
            this.toastrService.success(`Grupa ${result.name} została dodana`);
            this.router.navigate(['app/budget']);
          }
        );
    }
  }

}
