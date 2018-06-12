import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericalSerieHardComponent } from './numerical-serie-hard.component';

describe('NumericalSerieHardComponent', () => {
  let component: NumericalSerieHardComponent;
  let fixture: ComponentFixture<NumericalSerieHardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericalSerieHardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericalSerieHardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
