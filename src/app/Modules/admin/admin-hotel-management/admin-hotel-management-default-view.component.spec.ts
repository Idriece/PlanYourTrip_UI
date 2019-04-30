import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelManagementDefaultViewComponent } from './admin-hotel-management-default-view.component';

describe('AdminHotelManagementDefaultViewComponent', () => {
  let component: AdminHotelManagementDefaultViewComponent;
  let fixture: ComponentFixture<AdminHotelManagementDefaultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHotelManagementDefaultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHotelManagementDefaultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
