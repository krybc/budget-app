import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Category} from '@categories-data-access';
import {DialogComponent} from '@shared/ui';
import {BudgetCategory, BudgetSummary} from '@budget-data-access';
import {MatDialog} from '@angular/material/dialog';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss']
})
export class BudgetTableComponent implements OnInit {
  @Input() budget: BudgetCategory[];
  @Input() budgetSummary: BudgetSummary;
  @Output() deleteCategory = new EventEmitter<Category>();
  @Output() changeOrder = new EventEmitter<Category>();

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public onDeleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        content: 'Do you want to delete the category?',
        model: category
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCategory.emit(category);
      }
    });
  }

  public onListDrop(event: CdkDragDrop<Category>) {
    if (event.currentIndex !== event.previousIndex) {
      const item = { ...event.item.data };
      item.order = event.currentIndex + 1;
      this.changeOrder.emit(item);
    }
  }
}
