import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagetypeComponent } from './packagetype.component';

describe('PackagetypeComponent', () => {
  let component: PackagetypeComponent;
  let fixture: ComponentFixture<PackagetypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagetypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
