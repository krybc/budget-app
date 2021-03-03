import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowSummaryComponent } from './flow-summary.component';

describe('FlowSummaryComponent', () => {
  let component: FlowSummaryComponent;
  let fixture: ComponentFixture<FlowSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
