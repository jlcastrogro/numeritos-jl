import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTemplate } from './template.component';

describe('TemplateComponent', () => {
  let component: GameTemplate;
  let fixture: ComponentFixture<GameTemplate>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTemplate ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTemplate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
