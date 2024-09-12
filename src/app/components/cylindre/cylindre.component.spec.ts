import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CylindreComponent } from './cylindre.component';

describe('CylindreComponent', () => {
  let component: CylindreComponent;
  let fixture: ComponentFixture<CylindreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CylindreComponent]
    });
    fixture = TestBed.createComponent(CylindreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
