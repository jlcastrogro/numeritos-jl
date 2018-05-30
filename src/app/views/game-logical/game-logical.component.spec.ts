import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameLogicalComponent } from './game-logical.component';

describe('GameLogicalComponent', () => {
  let component: GameLogicalComponent;
  let fixture: ComponentFixture<GameLogicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameLogicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameLogicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
