import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasPageComponent } from './bas-page.component';

describe('BasPageComponent', () => {
  let component: BasPageComponent;
  let fixture: ComponentFixture<BasPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
