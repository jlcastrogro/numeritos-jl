import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameShoppingComponent } from './game-shopping.component';

describe('GameShoppingComponent', () => {
  let component: GameShoppingComponent;
  let fixture: ComponentFixture<GameShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
