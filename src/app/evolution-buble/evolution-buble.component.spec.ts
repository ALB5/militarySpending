import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionBubleComponent } from './evolution-buble.component';

describe('EvolutionBubleComponent', () => {
  let component: EvolutionBubleComponent;
  let fixture: ComponentFixture<EvolutionBubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolutionBubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionBubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
