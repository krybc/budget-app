import { TestBed, inject } from '@angular/core/testing';

import { CategoryGroupService } from './category-group.service';

describe('CategoryGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryGroupService]
    });
  });

  it('should be created', inject([CategoryGroupService], (service: CategoryGroupService) => {
    expect(service).toBeTruthy();
  }));
});
