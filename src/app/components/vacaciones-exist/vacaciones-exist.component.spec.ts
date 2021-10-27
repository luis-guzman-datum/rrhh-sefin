import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesExistComponent } from './vacaciones-exist.component';

describe('VacacionesExistComponent', () => {
  let component: VacacionesExistComponent;
  let fixture: ComponentFixture<VacacionesExistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacacionesExistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacacionesExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
