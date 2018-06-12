import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaView } from './sea.component';

describe('SeaComponent', () => {
  let component: SeaView;
  let fixture: ComponentFixture<SeaView>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeaView ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeaView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
