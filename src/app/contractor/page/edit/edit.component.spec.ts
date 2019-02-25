import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorEditComponent } from './edit.component';

describe('ContractorEditComponent', () => {
  let component: ContractorEditComponent;
  let fixture: ComponentFixture<ContractorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
