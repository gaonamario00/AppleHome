import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdIndividualComponent } from './prod-individual.component';

describe('ProdIndividualComponent', () => {
  let component: ProdIndividualComponent;
  let fixture: ComponentFixture<ProdIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdIndividualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
