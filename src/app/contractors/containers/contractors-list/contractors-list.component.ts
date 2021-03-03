import {Component, OnInit} from '@angular/core';
import {ContractorsFacade} from '@contractors-data-access';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractors-list.component.html',
  styleUrls: ['./contractors-list.component.scss']
})
export class ContractorsListComponent implements OnInit {
  contractors$ = this.contractorsFacade.contractors$;
  contractorsLoaded$ = this.contractorsFacade.contractorsLoaded$;
  displayedColumns: string[] = ['name', 'street', 'city'];

  constructor(
    private contractorsFacade: ContractorsFacade
  ) { }

  ngOnInit() {
  }
}
