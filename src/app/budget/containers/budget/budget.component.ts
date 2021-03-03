import { Component, OnInit } from '@angular/core';
import {BudgetFacade, BudgetParams} from '@budget-data-access';
import {CategoriesFacade, Category} from '@categories-data-access';

@Component({
  selector: 'app-page-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budget$ = this.budgetFacade.budget$;
  budgetSummary$ = this.budgetFacade.budgetSummary$;
  params$ = this.budgetFacade.params$;

  constructor(
    private categoriesFacade: CategoriesFacade,
    private budgetFacade: BudgetFacade,
  ) { }

  ngOnInit() {
  }

  setParams(params: BudgetParams) {
    this.budgetFacade.setParams(params);
  }

  deleteCategory(category: Category) {
    this.categoriesFacade.deleteCategory(category);
  }
}
