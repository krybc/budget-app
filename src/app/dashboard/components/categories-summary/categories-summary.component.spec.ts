import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSummaryComponent } from './categories-summary.component';

describe('FlowSummaryComponent', () => {
  let component: CategoriesSummaryComponent;
  let fixture: ComponentFixture<CategoriesSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
