import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOwnerCheckInComponent } from './hotel-owner-check-in.component';

describe('HotelOwnerCheckInComponent', () => {
  let component: HotelOwnerCheckInComponent;
  let fixture: ComponentFixture<HotelOwnerCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelOwnerCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelOwnerCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
