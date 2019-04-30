import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingdateComponent } from './bookingdate.component';

describe('BookingdateComponent', () => {
  let component: BookingdateComponent;
  let fixture: ComponentFixture<BookingdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
