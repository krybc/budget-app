import { Component, OnInit } from '@angular/core';
import {BudgetPrepare} from '../../utils/budget-prepare';
import {forkJoin} from 'rxjs';
import {CategoryService} from '../../../core/service/category.service';
import {TransactionService} from '../../../core/service/transaction.service';
import {FiltersStore} from '../../../core/store/filters.store';
import {FiltersState} from '../../../core/state/filters.state';
import {DateTime} from 'luxon';
import {CategoryGroupModel} from '../../../core/model/category-group.model';
import {CategoryModel} from '../../../core/model/category.model';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogComponent} from '../../../shared/component/dialog/dialog.component';
import {CategoryGroupService} from '../../../core/service/category-group.service';

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
    public dialog: MatDialog,
    private categoryGroupService: CategoryGroupService,
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private filtersStore: FiltersStore,
    private snackBar: MatSnackBar,
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

  public deleteGroup(group: CategoryGroupModel) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: 'Do you want to delete the category group?',
        model: group
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.categoryGroupService.delete(group.id)
          .subscribe(result => {
            this.prepareBudget();
            this.snackBar.open('Category group has been deleted', 'Close');
          });
      }
    });
  }

  public deleteCategory(category: CategoryModel) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: 'Do you want to delete the category?',
        model: category
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.categoryService.delete(category.id)
          .subscribe(result => {
            this.prepareBudget();
            this.snackBar.open(`Category ${result.name} has been deleted`, 'Close');
          });
      }
    });
  }

}
