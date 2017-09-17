import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreemapEnveloppeComponent } from './treemap-enveloppe.component';

describe('TreemapEnveloppeComponent', () => {
  let component: TreemapEnveloppeComponent;
  let fixture: ComponentFixture<TreemapEnveloppeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreemapEnveloppeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreemapEnveloppeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
