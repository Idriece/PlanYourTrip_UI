import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultAdminUserComponent } from './default-admin-user.component';

describe('DefaultAdminUserComponent', () => {
  let component: DefaultAdminUserComponent;
  let fixture: ComponentFixture<DefaultAdminUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefaultAdminUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultAdminUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
