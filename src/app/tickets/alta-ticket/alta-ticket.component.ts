import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alta-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './alta-ticket.component.html',
  styleUrl: './alta-ticket.component.css'
})
export class AltaTicketComponent {
  nuevoTicket: string = '';
  tickets: string[] = [];

  agregarTicket() {
    if (this.nuevoTicket.trim() !== '') {
      this.tickets.push(this.nuevoTicket);
      this.nuevoTicket = ''; // Limpiar el campo después de agregar un ticket
    }
  }
}
