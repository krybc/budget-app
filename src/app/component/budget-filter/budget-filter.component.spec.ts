import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFilterComponent } from './budget-filter.component';

describe('DashboardFiltersComponent', () => {
  let component: BudgetFilterComponent;
  let fixture: ComponentFixture<BudgetFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BudgetFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
