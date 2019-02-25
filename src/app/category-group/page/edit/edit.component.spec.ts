import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGroupEditComponent } from './edit.component';

describe('CategoryGroupEditComponent', () => {
  let component: CategoryGroupEditComponent;
  let fixture: ComponentFixture<CategoryGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
