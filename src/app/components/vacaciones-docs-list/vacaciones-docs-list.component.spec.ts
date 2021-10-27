import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacacionesDocsListComponent } from './vacaciones-docs-list.component';

describe('VacacionesDocsListComponent', () => {
  let component: VacacionesDocsListComponent;
  let fixture: ComponentFixture<VacacionesDocsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacacionesDocsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacacionesDocsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
