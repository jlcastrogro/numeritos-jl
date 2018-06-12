import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandsView } from './islands.component';

describe('IslandsComponent', () => {
  let component: IslandsView;
  let fixture: ComponentFixture<IslandsView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslandsView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslandsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
