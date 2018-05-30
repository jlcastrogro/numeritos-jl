import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCountingComponent } from './game-counting.component';

describe('GameCountingComponent', () => {
  let component: GameCountingComponent;
  let fixture: ComponentFixture<GameCountingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCountingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCountingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
