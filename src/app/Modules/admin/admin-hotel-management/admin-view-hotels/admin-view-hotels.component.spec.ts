import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewHotelsComponent } from './admin-view-hotels.component';

describe('AdminViewHotelsComponent', () => {
  let component: AdminViewHotelsComponent;
  let fixture: ComponentFixture<AdminViewHotelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewHotelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewHotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
