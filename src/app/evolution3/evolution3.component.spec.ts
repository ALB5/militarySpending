import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Evolution3Component } from './evolution3.component';

describe('Evolution3Component', () => {
  let component: Evolution3Component;
  let fixture: ComponentFixture<Evolution3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Evolution3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Evolution3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
