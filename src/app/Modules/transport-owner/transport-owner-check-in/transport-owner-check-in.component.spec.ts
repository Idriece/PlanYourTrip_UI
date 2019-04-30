import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportOwnerCheckInComponent } from './transport-owner-check-in.component';

describe('TransportOwnerCheckInComponent', () => {
  let component: TransportOwnerCheckInComponent;
  let fixture: ComponentFixture<TransportOwnerCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportOwnerCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportOwnerCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
