import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditExistingHotelComponentComponent } from './admin-edit-existing-hotel-component.component';

describe('AdminEditExistingHotelComponentComponent', () => {
  let component: AdminEditExistingHotelComponentComponent;
  let fixture: ComponentFixture<AdminEditExistingHotelComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditExistingHotelComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditExistingHotelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
