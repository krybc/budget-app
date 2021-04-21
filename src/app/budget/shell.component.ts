import {Component, OnInit} from '@angular/core';
import {CategoriesFacade} from '@categories-data-access';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class BudgetShellComponent implements OnInit {
  constructor(
    private categoriesFacade: CategoriesFacade,
  ) { }

  ngOnInit() {
    this.categoriesFacade.loadCategories();
  }
}
