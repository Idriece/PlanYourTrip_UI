import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDefaultViewComponent } from './admin-default-view.component';

describe('AdminDefaultViewComponent', () => {
  let component: AdminDefaultViewComponent;
  let fixture: ComponentFixture<AdminDefaultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDefaultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDefaultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
