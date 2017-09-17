import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffichagePaysComponent } from './affichage-pays.component';

describe('AffichagePaysComponent', () => {
  let component: AffichagePaysComponent;
  let fixture: ComponentFixture<AffichagePaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffichagePaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffichagePaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
