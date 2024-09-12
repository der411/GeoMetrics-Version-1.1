import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosangeComponent } from './losange.component';

describe('LosangeComponent', () => {
  let component: LosangeComponent;
  let fixture: ComponentFixture<LosangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LosangeComponent]
    });
    fixture = TestBed.createComponent(LosangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
