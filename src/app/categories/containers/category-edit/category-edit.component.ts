import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CategoriesFacade, Category} from '@categories-data-access';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  category$ = this.categoriesFacade.selectedCategory$;
  categoryLoaded$ = this.categoriesFacade.categoriesLoaded$;
  rootCategories$ = this.categoriesFacade.rootCategories$;

  private paramsSubscription$: Subscription;

  constructor(
    private router: Router,
    private categoriesFacade: CategoriesFacade,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.paramsSubscription$ = this.route.params.subscribe((params) => {
      this.categoriesFacade.selectCategory(params.id);
    });
  }

  onSave(category: Category) {
    this.categoriesFacade.updateCategory(category);
    this.router.navigate(['app/budget']);
  }

  ngOnDestroy() {
    this.paramsSubscription$.unsubscribe();
  }
}
