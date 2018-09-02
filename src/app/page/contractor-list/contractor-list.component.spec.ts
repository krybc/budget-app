import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorListComponent } from './contractor-list.component';

describe('ContractorListComponent', () => {
  let component: ContractorListComponent;
  let fixture: ComponentFixture<ContractorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
