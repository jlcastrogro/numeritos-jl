import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginView } from './login.component';

describe('LoginComponent', () => {
  let component: LoginView;
  let fixture: ComponentFixture<LoginView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
