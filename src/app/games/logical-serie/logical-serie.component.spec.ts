import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogicalSerieComponent } from './logical-serie.component';

describe('LogicalSerieComponent', () => {
  let component: LogicalSerieComponent;
  let fixture: ComponentFixture<LogicalSerieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogicalSerieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogicalSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
