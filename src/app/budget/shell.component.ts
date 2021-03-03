import {Component, OnInit} from '@angular/core';
import {BudgetFacade} from '@budget-data-access';
import {CategoriesFacade} from '@categories-data-access';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class BudgetShellComponent implements OnInit {
  constructor(
    private categoriesFacade: CategoriesFacade,
    private budgetFacade: BudgetFacade,
  ) { }

  ngOnInit() {
    this.categoriesFacade.loadCategories();
    this.budgetFacade.initBudget();
  }
}
