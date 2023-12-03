
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../services/reportes.service';
import { ArticuloConjuntoService } from '../services/articulo-conjunto.service';
import { ArticuloIndividualService } from '../services/articulo.individual.service';
import { TicketService } from '../services/ticket.service';
import { Articulo, Producto, Ticket } from '../Models/Models';

import jsPDF from 'jspdf'
import autoTable, { RowInput, Styles } from 'jspdf-autotable'


@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

  productosPre: Articulo[] = [];
  productosConj: Producto[] = [];
  productos: Producto[] = [];
  tickets: Ticket[] = [];
  productosAux: Producto[] = [];
  nombreConj: string = '';
  precioConj: number = 0;
  id: string | undefined;
  idProd: number | undefined;

  totalVentas = 0;


  constructor(private _reportesService: ReportesService, 
    private _articuloConjService: ArticuloConjuntoService,
    private _articuloIndService: ArticuloIndividualService,
    private _ticketService: TicketService){}
  datos: any[] = [
    { nombre: 'Persona 1', fecha: '2023-12-01' },
    { nombre: 'Persona 2', fecha: '2023-12-02' },
    { nombre: 'Persona 3', fecha: '2023-12-03' },
  ];

  ngOnInit(){
    this.getProductos();
    this.getTickets();
  }

  getProductos(){
    this._articuloConjService.listarProductosConjuntos().subscribe(conj =>{
      console.log(conj);
      this.productosConj = conj;
      this.productosAux = conj;
      //console.log(this.productosAux)
      this._articuloIndService.listarProductosIndividuales().subscribe(ind => {
        this.productosAux = [...this.productosConj, ...ind];
        this.productos = this.productosAux;
        this.productos.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
      });
    });
  }

  getTickets(){
    this._ticketService.listarTickets().subscribe(res =>{
      console.log(res);
      this.tickets = res;
      //this.calcularTotalVentas();
      //console.log(this.productos);
      this.calcularTotalVentas();
      this.tickets.sort((a, b) => a.NombrePersona.localeCompare(b.NombrePersona));
    });
  }
  
  calcularTotalVentas() {
    this.totalVentas = this.tickets.reduce((total, ticket) => total + Number(ticket.Total || 0), 0);
    console.log(this.totalVentas);
  }

  descargarPDF() {
    const doc = new jsPDF();

    // Encabezado
    doc.text('Reporte de Ventas', 20, 10);
    doc.text(`Total de Ventas: $${this.totalVentas}`, 20, 20);

    // Datos para la tabla
    const rows: RowInput[] = [];
    const headers = ['Ticket', 'Nombre Persona', 'Total', 'Fecha'];

    // Llenar datos de la tabla
    this.tickets.forEach((ticket, index) => {
      if(ticket.Fechastr != undefined){
        const rowData: RowInput = {};
        rowData[0] = index + 1;
        rowData[1] = ticket.NombrePersona;
        rowData[2] = `$${ticket.Total}`;
        rowData[3] = ticket.Fechastr;
  
        // Agregar información detallada de los productos del ticket
        ticket.Articulos.forEach((articulo, i) => {
          const producto = this.productos.find(p => p.idProd === articulo.idProducto);
          if (producto) {
            rowData[headers.length + i] = `- ${articulo.Cantidad} x ${producto.Nombre}`;
          }
        });
  
        rows.push(rowData);
      }

    });

    // Configurar la posición y el estilo de la tabla
    const startY = 30;
    const styles: Partial<Styles> = { valign: 'middle', halign: 'center' };

    // Agregar la tabla al documento
    autoTable(doc, {
      head: [headers],
      body: rows,
      startY,
      styles,
    });

    // Guardar el documento PDF
    doc.save('reporte_ventas.pdf');
  }
}


