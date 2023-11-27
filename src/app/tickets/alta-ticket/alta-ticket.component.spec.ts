import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaTicketComponent } from './alta-ticket.component';

describe('AltaTicketComponent', () => {
  let component: AltaTicketComponent;
  let fixture: ComponentFixture<AltaTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AltaTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
