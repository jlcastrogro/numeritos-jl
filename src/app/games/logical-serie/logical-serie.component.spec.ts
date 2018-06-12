import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalSerieGame } from './logical-serie.component';

describe('LogicalSerieComponent', () => {
  let component: LogicalSerieGame;
  let fixture: ComponentFixture<LogicalSerieGame>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalSerieGame ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalSerieGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
