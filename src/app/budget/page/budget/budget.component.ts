import { Component, OnInit } from '@angular/core';
import {BudgetPrepare} from '../../utils/budget-prepare';
import {forkJoin} from 'rxjs';
import {CategoryService} from '../../../core/service/category.service';
import {TransactionService} from '../../../core/service/transaction.service';
import {FiltersStore} from '../../../core/store/filters.store';
import {FiltersState} from '../../../core/state/filters.state';
import {DateTime} from 'luxon';

@Component({
  selector: 'app-page-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetPageComponent implements OnInit {
  filters: FiltersState;
  budget: any[];
  budgetSummary = {
    income: 0,
    expense: 0
  };

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private filtersStore: FiltersStore,
  ) { }

  ngOnInit() {
    this.filtersStore.state$.subscribe(filters => {
      this.filters = {...filters, ...{contractor: null, category: null}};
      this.prepareBudget();
    });
  }

  onChangeMonth(month: DateTime) {
    this.filtersStore.setMonth(month);
  }

  prepareBudget() {
    const combine = forkJoin(
      this.categoryService.tree(),
      this.transactionService.list({...this.filters})
    );

    combine.subscribe((values) => {
      const { budget, budgetSummary } = new BudgetPrepare(values[0], values[1]).run();

      this.budget = budget;
      this.budgetSummary = budgetSummary;
    });
  }

}
