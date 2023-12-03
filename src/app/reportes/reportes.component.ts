
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
    // Crear el documento PDF
    const doc = new jsPDF();
  
    // Obtener la fecha actual
    const fechaActual = new Date().toLocaleDateString();
  
    // Configurar el encabezado de la fecha
    doc.text(`Fecha de Emisión: ${fechaActual}`, 20, 10);
  
    // Configurar el encabezado principal del reporte
    doc.text('Reporte de Ventas', 20, 20);
  
    // Configurar datos para la tabla
    const headers = ['Ticket', 'Nombre Persona', 'Total', 'Fecha', 'Productos'];
    const rows: (string | number)[][] = [];
    
    // Llenar datos de la tabla
    this.tickets.forEach((ticket, index) => {
      if(ticket.Fechastr !== undefined){
        const rowData: (string | number)[] = [
          index + 1,
          ticket.NombrePersona,
          `$${ticket.Total}`,
          ticket.Fechastr,
          '' // Columna de Productos inicializada con cadena vacía
        ];
      
        // Agregar información detallada de los productos del ticket
        ticket.Articulos.forEach((articulo, i) => {
          const producto = this.productos.find(p => p.idProd === articulo.idProducto);
          if (producto) {
            rowData[4] += `- ${articulo.Cantidad} x ${producto.Nombre}\n`; // Concatenar productos
          }
        });
      
        // Agregar la fila al arreglo de filas
        rows.push(rowData);
      }

    });
    
  
    // Configurar la posición y el estilo de la tabla
    const startY = 30;
    const styles: Partial<Styles> = { valign: 'middle', halign: 'center' };
  
    // Agregar la tabla al documento
    autoTable(doc, {
      columns: headers.map(header => ({ header })),
      body: rows,
      startY,
      styles,
    });
  
    // Guardar el documento PDF
    doc.save('reporte_ventas.pdf');
  }
  
  
  
  
  
}


