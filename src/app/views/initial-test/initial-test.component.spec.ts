import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialTestView } from './initial-test-view.component';

describe('InitialTestViewComponent', () => {
  let component: InitialTestView;
  let fixture: ComponentFixture<InitialTestView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialTestView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialTestView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
