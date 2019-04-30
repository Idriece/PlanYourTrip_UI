import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTransportationProviderCComponent } from './admin-view-transportation-provider-c.component';

describe('AdminViewTransportationProviderCComponent', () => {
  let component: AdminViewTransportationProviderCComponent;
  let fixture: ComponentFixture<AdminViewTransportationProviderCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminViewTransportationProviderCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewTransportationProviderCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
