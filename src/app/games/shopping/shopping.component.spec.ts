import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingGame } from './shopping.component';

describe('ShoppingComponent', () => {
  let component: ShoppingGame;
  let fixture: ComponentFixture<ShoppingGame>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingGame ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
