import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNewHotelComponentComponent } from './admin-add-new-hotel-component.component';

describe('AdminAddNewHotelComponentComponent', () => {
  let component: AdminAddNewHotelComponentComponent;
  let fixture: ComponentFixture<AdminAddNewHotelComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddNewHotelComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNewHotelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
