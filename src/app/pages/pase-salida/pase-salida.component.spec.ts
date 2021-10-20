import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaseSalidaComponent } from './pase-salida.component';

describe('PaseSalidaComponent', () => {
  let component: PaseSalidaComponent;
  let fixture: ComponentFixture<PaseSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaseSalidaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaseSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
