import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVacacionesComponent } from './form-vacaciones.component';

describe('FormVacacionesComponent', () => {
  let component: FormVacacionesComponent;
  let fixture: ComponentFixture<FormVacacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVacacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVacacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
