import { Component, OnInit } from '@angular/core';
import {ContractorService} from '../../service/contractor.service';
import {ContractorModel} from '../../model/contractor.model';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.scss']
})
export class ContractorListComponent implements OnInit {
  contractorList: ContractorModel[];
  displayedColumns: string[] = ['name', 'street', 'city'];

  constructor(
    private contractorService: ContractorService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.contractorService.list()
      .subscribe(
        (response) => {
          this.contractorList = response;
        }
      );
  }

}
