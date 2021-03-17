import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTransactionsTableComponent } from './latest-transactions-table.component';

describe('LatestTransactionsTableComponent', () => {
  let component: LatestTransactionsTableComponent;
  let fixture: ComponentFixture<LatestTransactionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestTransactionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestTransactionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
