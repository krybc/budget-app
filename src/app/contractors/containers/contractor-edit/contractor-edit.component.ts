import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contractor, ContractorsFacade} from '@contractors-data-access';

@Component({
  selector: 'app-contractor-edit',
  templateUrl: './contractor-edit.component.html',
  styleUrls: ['./contractor-edit.component.scss']
})
export class ContractorEditComponent implements OnInit {
  contractor$ = this.contractorsFacade.selectedContractor$;
  contractorsLoaded$ = this.contractorsFacade.contractorsLoaded$;

  constructor(
    private router: Router,
    private contractorsFacade: ContractorsFacade,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.contractorsFacade.selectContractor(params.id);
    });

  }

  onSave(contractor: Contractor) {
    this.contractorsFacade.updateContractor(contractor);
    this.router.navigate(['app/contractors']);
  }
}
