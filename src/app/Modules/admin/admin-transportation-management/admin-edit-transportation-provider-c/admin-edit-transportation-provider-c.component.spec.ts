import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditTransportationProviderCComponent } from './admin-edit-transportation-provider-c.component';

describe('AdminEditTransportationProviderCComponent', () => {
  let component: AdminEditTransportationProviderCComponent;
  let fixture: ComponentFixture<AdminEditTransportationProviderCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditTransportationProviderCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditTransportationProviderCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
