import {Component, OnInit} from '@angular/core';
import {CategoriesFacade} from '@categories-data-access';


@Component({
  selector: 'app-categories-shell',
  template: '<router-outlet></router-outlet>',
})
export class ShellComponent implements OnInit {
  constructor(
    private categoriesFacade: CategoriesFacade
  ) { }

  ngOnInit() {
    this.categoriesFacade.loadCategories();
  }
}
