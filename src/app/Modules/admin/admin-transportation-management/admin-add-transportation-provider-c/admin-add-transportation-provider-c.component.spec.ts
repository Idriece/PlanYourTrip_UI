import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTransportationProviderCComponent } from './admin-add-transportation-provider-c.component';

describe('AdminAddTransportationProviderCComponent', () => {
  let component: AdminAddTransportationProviderCComponent;
  let fixture: ComponentFixture<AdminAddTransportationProviderCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddTransportationProviderCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddTransportationProviderCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
