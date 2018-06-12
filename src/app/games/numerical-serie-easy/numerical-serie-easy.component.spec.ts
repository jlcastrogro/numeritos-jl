import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericalSerieEasyComponent } from './numerical-serie-easy.component';

describe('NumericalSerieEasyComponent', () => {
  let component: NumericalSerieEasyComponent;
  let fixture: ComponentFixture<NumericalSerieEasyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericalSerieEasyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericalSerieEasyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
