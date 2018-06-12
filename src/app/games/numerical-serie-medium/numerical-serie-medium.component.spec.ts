import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericalSerieMediumComponent } from './numerical-serie-medium.component';

describe('NumericalSerieMediumComponent', () => {
  let component: NumericalSerieMediumComponent;
  let fixture: ComponentFixture<NumericalSerieMediumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericalSerieMediumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericalSerieMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
