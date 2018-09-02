import { Component, OnInit } from '@angular/core';
import {BudgetPrepare} from '../../utils/budget-prepare';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {CategoryService} from '../../service/category.service';
import {TransactionService} from '../../service/transaction.service';
import * as moment from 'moment';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  filters: any = {
    month: null
  };
  filtersSubject: BehaviorSubject<any> = new BehaviorSubject<any>({
    month: moment()
  });
  budget: any[];
  budgetSummary = {
    income: 0,
    expense: 0
  };

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
  ) { }

  ngOnInit() {
    this.prepareBudget();

    this.filtersSubject.subscribe((value) => {
      if (value.month !== null) {
        this.filters = value;

        this.prepareBudget();
      }
    });

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
