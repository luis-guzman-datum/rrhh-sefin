import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesSolicitadasComponent } from './vacaciones-solicitadas.component';

describe('VacacionesSolicitadasComponent', () => {
  let component: VacacionesSolicitadasComponent;
  let fixture: ComponentFixture<VacacionesSolicitadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacacionesSolicitadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacacionesSolicitadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
