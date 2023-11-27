import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisoPruebaComponent } from './aviso-prueba.component';

describe('AvisoPruebaComponent', () => {
  let component: AvisoPruebaComponent;
  let fixture: ComponentFixture<AvisoPruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvisoPruebaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvisoPruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
