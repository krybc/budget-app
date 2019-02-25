import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryGroupAddComponent } from './add.component';

describe('CategoryGroupAddComponent', () => {
  let component: CategoryGroupAddComponent;
  let fixture: ComponentFixture<CategoryGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
