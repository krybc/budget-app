import { TestBed, inject } from '@angular/core/testing';

import { FiltersState } from './filters.state';

describe('FiltersState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FiltersState]
    });
  });

  it('should be created', inject([FiltersState], (service: FiltersState) => {
    expect(service).toBeTruthy();
  }));
});
