import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountingGame } from './counting.component';

describe('CountingComponent', () => {
  let component: CountingGame;
  let fixture: ComponentFixture<CountingGame>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountingGame ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountingGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
