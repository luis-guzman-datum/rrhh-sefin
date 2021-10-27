import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVacacionesDocsComponent } from './form-vacaciones-docs.component';

describe('FormVacacionesDocsComponent', () => {
  let component: FormVacacionesDocsComponent;
  let fixture: ComponentFixture<FormVacacionesDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVacacionesDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVacacionesDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
