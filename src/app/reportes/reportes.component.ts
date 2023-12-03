
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../services/reportes.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

  constructor(private _reportesService: ReportesService){}
  datos: any[] = [
    { nombre: 'Persona 1', fecha: '2023-12-01' },
    { nombre: 'Persona 2', fecha: '2023-12-02' },
    { nombre: 'Persona 3', fecha: '2023-12-03' },
  ];

  descargarPDF() {
    const doc = new jsPDF();

    doc.text('Lista de Personas', 20, 10);

    this.datos.forEach((persona, index) => {
      const yPosition = 20 + index * 10;
      doc.text(`${index + 1}. ${persona.nombre}, Fecha: ${persona.fecha}`, 20, yPosition);
    });

    doc.save('lista_personas.pdf');
  }

}
