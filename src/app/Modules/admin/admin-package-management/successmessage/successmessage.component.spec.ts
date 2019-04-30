import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessmessageComponent } from './successmessage.component';

describe('SuccessmessageComponent', () => {
  let component: SuccessmessageComponent;
  let fixture: ComponentFixture<SuccessmessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessmessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
