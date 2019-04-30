import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelOwnerDefaultViewComponent } from './hotel-owner-default-view.component';

describe('HotelOwnerDefaultViewComponent', () => {
  let component: HotelOwnerDefaultViewComponent;
  let fixture: ComponentFixture<HotelOwnerDefaultViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelOwnerDefaultViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelOwnerDefaultViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
