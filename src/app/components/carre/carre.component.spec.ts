import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreComponent } from './carre.component';

describe('CarreComponent', () => {
  let component: CarreComponent;
  let fixture: ComponentFixture<CarreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarreComponent]
    });
    fixture = TestBed.createComponent(CarreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
