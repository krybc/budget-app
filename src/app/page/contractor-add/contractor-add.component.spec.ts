import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorAddComponent } from './contractor-add.component';

describe('ContractorCreateComponent', () => {
  let component: ContractorAddComponent;
  let fixture: ComponentFixture<ContractorAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
