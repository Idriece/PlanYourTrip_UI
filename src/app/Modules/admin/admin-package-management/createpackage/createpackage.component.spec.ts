import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepackageComponent } from './createpackage.component';

describe('CreatepackageComponent', () => {
  let component: CreatepackageComponent;
  let fixture: ComponentFixture<CreatepackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
