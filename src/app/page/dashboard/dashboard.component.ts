import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../../service/transaction.service';
import {ToastrService} from 'ngx-toastr';
import {AccountService} from '../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  latestTransactions: any[] = null;
  filters = {
    month: moment()
  };

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.prepareLatestTransactions();
  }

  prepareLatestTransactions() {
    this.transactionService.list({month: new Date(Date.now())}, null, 10)
      .subscribe((result) => {
        this.latestTransactions = result;
      });
  }

}
