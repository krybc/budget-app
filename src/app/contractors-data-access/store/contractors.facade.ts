import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromContractors from './contractors.reducer';
import * as ContractorsSelectors from './contractors.selectors';
import {Contractor} from './contractors.models';
import {ContractorsActions} from './contractors.actions';

@Injectable({
  providedIn: 'root'
})
export class ContractorsFacade {
  contractors$ = this.store.pipe(select(ContractorsSelectors.getContractors));
  contractorsLoaded$ = this.store.pipe(select(ContractorsSelectors.isContractorsLoaded));
  selectedContractor$ = this.store.pipe(select(ContractorsSelectors.getSelectedContractor));

  constructor(
    private store: Store<fromContractors.ContractorsPartialState>
  ) {
  }

  loadContractors() {
    this.store.dispatch(ContractorsActions.loadContractors());
  }

  selectContractor(id: number) {
    this.store.dispatch(ContractorsActions.selectContractor({id}));
  }

  createContractor(contractor: Contractor) {
    this.store.dispatch(ContractorsActions.createContractor({contractor}));
  }

  updateContractor(contractor: Contractor) {
    this.store.dispatch(ContractorsActions.updateContractor({contractor}));
  }
}
