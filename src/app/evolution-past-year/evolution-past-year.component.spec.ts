import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionPastYearComponent } from './evolution-past-year.component';

describe('EvolutionPastYearComponent', () => {
  let component: EvolutionPastYearComponent;
  let fixture: ComponentFixture<EvolutionPastYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolutionPastYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionPastYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
