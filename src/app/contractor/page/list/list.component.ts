import {Component, OnInit} from '@angular/core';
import {ContractorService} from '../../../core/service/contractor.service';
import {ContractorModel} from '../../../core/model/contractor.model';
import {LoadingStatus} from '../../../shared/enum/loading-status.enum';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ContractorListComponent implements OnInit {
  contractorList: ContractorModel[];
  displayedColumns: string[] = ['name', 'street', 'city'];
  loadingStatus: LoadingStatus = LoadingStatus.pending;

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
          this.loadingStatus = LoadingStatus.success;
        }
      );
  }

}
