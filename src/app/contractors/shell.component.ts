import {Component, OnInit} from '@angular/core';
import {ContractorsFacade} from '@contractors-data-access';

@Component({
  template: '<router-outlet></router-outlet>',
})
export class ShellComponent implements OnInit {
  constructor(
    private contractorsFacade: ContractorsFacade
  ) { }

  ngOnInit() {
    this.contractorsFacade.loadContractors();
  }
}
