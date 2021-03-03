import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriesFacade, Category} from '@categories-data-access';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  rootCategories$ = this.categoriesFacade.rootCategories$;
  queryParams$ = this.route.queryParams;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesFacade: CategoriesFacade,
  ) { }

  ngOnInit() {
  }

  onSave(category: Category) {
    this.categoriesFacade.createCategory(category);
    this.router.navigate(['app/budget']);
  }
}
