import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerCapitaComponent } from './per-capita.component';

describe('PerCapitaComponent', () => {
  let component: PerCapitaComponent;
  let fixture: ComponentFixture<PerCapitaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerCapitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerCapitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
