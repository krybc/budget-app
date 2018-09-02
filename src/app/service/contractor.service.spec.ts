import { TestBed, inject } from '@angular/core/testing';

import { ContractorService } from './contractor.service';

describe('ContractorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractorService]
    });
  });

  it('should be created', inject([ContractorService], (service: ContractorService) => {
    expect(service).toBeTruthy();
  }));
});
