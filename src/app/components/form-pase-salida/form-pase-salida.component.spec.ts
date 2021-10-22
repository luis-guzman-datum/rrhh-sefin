import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPaseSalidaComponent } from './form-pase-salida.component';

describe('FormPaseSalidaComponent', () => {
  let component: FormPaseSalidaComponent;
  let fixture: ComponentFixture<FormPaseSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPaseSalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPaseSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
