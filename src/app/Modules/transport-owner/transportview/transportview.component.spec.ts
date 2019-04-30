import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportviewComponent } from './transportview.component';

describe('TransportviewComponent', () => {
  let component: TransportviewComponent;
  let fixture: ComponentFixture<TransportviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
