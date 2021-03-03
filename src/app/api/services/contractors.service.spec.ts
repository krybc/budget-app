import { TestBed, inject } from '@angular/core/testing';

import { ContractorsService } from './contractors.service';

describe('ContractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractorsService]
    });
  });

  it('should be created', inject([ContractorsService], (service: ContractorsService) => {
    expect(service).toBeTruthy();
  }));
});
