import {Component, OnInit} from '@angular/core';
import {Contractor, ContractorsFacade} from '@contractors-data-access';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contractor-add',
  templateUrl: './contractor-add.component.html',
  styleUrls: ['./contractor-add.component.scss']
})
export class ContractorAddComponent implements OnInit {
  constructor(
    private router: Router,
    private contractorsFacade: ContractorsFacade,
  ) { }

  ngOnInit() {
  }

  onSave(contractor: Contractor) {
    this.contractorsFacade.createContractor(contractor);
    this.router.navigate(['app/contractors']);
  }
}
