import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IslandView } from './island.component';

describe('IslandComponent', () => {
  let component: IslandView;
  let fixture: ComponentFixture<IslandView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IslandView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IslandView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
