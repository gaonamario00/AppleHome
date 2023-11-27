import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdConjuntoComponent } from './prod-conjunto.component';

describe('ProdConjuntoComponent', () => {
  let component: ProdConjuntoComponent;
  let fixture: ComponentFixture<ProdConjuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdConjuntoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdConjuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
