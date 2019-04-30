import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedPackagesComponent } from './suggested-packages.component';

describe('SuggestedPackagesComponent', () => {
  let component: SuggestedPackagesComponent;
  let fixture: ComponentFixture<SuggestedPackagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedPackagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
