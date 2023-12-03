import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo, Producto, Ticket } from '../../Models/Models';
import { ArticuloIndividualService } from '../../services/articulo.individual.service';
import { ArticuloConjuntoService } from '../../services/articulo-conjunto.service';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from '../../services/ticket.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { Timestamp } from 'firebase/firestore';



@Component({
  selector: 'app-alta-ticket',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    NgbModule,
    ReactiveFormsModule, 
    DatePickerComponent],
  templateUrl: './alta-ticket.component.html',
  styleUrl: './alta-ticket.component.css'
})
export class AltaTicketComponent {

  constructor(private formBuilder: FormBuilder,
    private _articuloConjService: ArticuloConjuntoService,
    private _articuloIndService: ArticuloIndividualService,
    private _ticketService: TicketService,
    private toastr: ToastrService){}

  ticketForms!: FormGroup;
  productosPre: Articulo[] = [];
  productosConj: Producto[] = [];
  productos: Producto[] = [];
  tickets: Ticket[] = [];
  productosAux: Producto[] = [];
  nombreConj: string = '';
  precioConj: number = 0;
  fechaSeleccionada: NgbDateStruct | undefined;
  id: string | undefined;
  idProd: number | undefined;

  ngOnInit(){
    this.buildForm();
    this.getProductos();
    this.listarTickets();
  }

  buildForm(){
    this.ticketForms = this.formBuilder.group({
      nombreTicket: ['', Validators.required],
      precioTotalTicket: ['', [Validators.required]],
      productoSeleccionado: ['', Validators.required],
      TotalTicket: ['', Validators.required],
      fechaTicket: ['', [Validators.required]],
    });
  }

  agregarTicket() {
    const nombre = this.ticketForms.value.nombreTicket;
    const precioTotal = this.ticketForms.value.precioTotalTicket;
    const fechaSeleccionada = this.convertirNgbDateStructADate(this.fechaSeleccionada);
    const fechaSeleccionada1 = this.convertirDateToStringFormato(fechaSeleccionada);

    const fechaFormateada = fechaSeleccionada?.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    const fecha = this.convertirStringToDateFormato(fechaSeleccionada1);

    //console.log(fechaFormateada);

    const TICKET: Ticket = {
      idTicket: this.obtenerMayorId(this.tickets) + 1,
      NombrePersona: nombre,
      Articulos: this.productosPre,
      Total: precioTotal,
      Fecha: fecha,
      Fechastr: fechaFormateada
    };
    //this.productosConj.push(prodConj);
    this._ticketService.guardarTicket(TICKET).then(()=>{
      this.productosPre = [];
      this.getProductos();
      //console.log("Ticket registrado");  
      this.toastr.success("Ticket registrado con exito!");
      this.ticketForms.reset();
      this.ticketForms.get('productoSeleccionado')?.setValue("");
      this.ticketForms.get('TotalTicket')?.setValue("");
        }, error =>{
      //console.log(error);
      this.toastr.error("Ha ocurrido un error");
    });
  }

  convertirDateToStringFormato(date: Date | undefined): string {
    if (date === undefined) {
      return ''; // o cualquier valor predeterminado que desees para fechas nulas
    }
  
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const anio = date.getFullYear();
  
    return `${dia}/${mes}/${anio}`;
  }

  convertirTimestampADate(timestamp: any): Date | undefined {
    if (timestamp instanceof Timestamp) {
      return timestamp.toDate();
    }
    return undefined;
  }

  convertirStringToDateFormato(cadenaFecha: string): Date | undefined {
    const partes = cadenaFecha.split('/');
    
    if (partes.length !== 3) {
      // La cadena no tiene el formato esperado
      return undefined;
    }
  
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Restamos 1 porque los meses comienzan desde 0
    const anio = parseInt(partes[2], 10);
  
    if (isNaN(dia) || isNaN(mes) || isNaN(anio)) {
      // Al menos una parte de la fecha no es un número válido
      return undefined;
    }
  
    // Crear un nuevo objeto Date con las partes de la fecha
    const fechaParseada = new Date(anio, mes, dia);
  
    return fechaParseada;
  }

  convertirNgbDateStructADate(ngbDate: NgbDateStruct | undefined): Date | undefined {
    if (!ngbDate) {
      return undefined;
    }
    // Ajustar el mes ya que en JavaScript los meses van de 0 a 11
    return new Date(ngbDate.year, ngbDate.month - 1, ngbDate.day);
  }

  onProdConjSeleccionado(event: any){
    const selectedProductName = event.target.value;
    const selectedProduct = this.productosConj.find(p => p.Nombre === selectedProductName);

    if (selectedProduct) {
      const idProd = selectedProduct.idProd;
      this.idProd = idProd;
      //console.log('idProd seleccionado:', idProd);
    }
  }

  getProductos(){
    this._articuloConjService.listarProductosConjuntos().subscribe(conj =>{
      //console.log(res);
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

  agregarProductoAListaPre(){
    const idProducto = this.idProd;
    const productoSeleccionado = this.ticketForms.get('productoSeleccionado')?.value;
    const TotalTicket = this.ticketForms.get('TotalTicket')?.value;

    // Obtener el producto correspondiente a partir del nombre
    const productoEncontrado = this.productos.find(p => p.Nombre === productoSeleccionado);

    // Agregar el producto a la lista productosIndPre
    if (productoEncontrado) {
      this.productosPre.push({
        idProducto: idProducto, 
        NombreArticulo: productoEncontrado.Nombre, 
        Cantidad: TotalTicket,
        id: productoEncontrado.id
      });
    }

    this.productos = this.productos.filter(prod => prod.Nombre !== productoEncontrado?.Nombre);
    this.idProd = undefined;
    this.ticketForms.get('productoSeleccionado')?.setValue("");
    this.ticketForms.get('TotalTicket')?.setValue("");
  }

  listarTickets(){
    this._ticketService.listarTickets().subscribe(res =>{
      //console.log(res);
      this.tickets = res;
      //console.log(this.productos);
      this.tickets.sort((a, b) => a.NombrePersona.localeCompare(b.NombrePersona));
    });
  }

  eliminarTicket(id: any): void{
    this._ticketService.eliminarTickets(id).then(() => {
      this.toastr.error("Ticket eliminado");
    }).catch(error => {
      console.error('Error al eliminar el producto:', error);
    });
  }

  eliminarProdPre(art: Articulo){
    let index:number = this.productosPre.indexOf(art);
    if (index !== -1) {
      this.productosPre.splice(index, 1);
    }
    if(art.idProducto !== undefined){
      this.addPreToSelect(art.idProducto);
    }
  }

  addPreToSelect(id: number){
        //console.log(id);
    //console.log(this.productosAux);
    const productoEncontrado = this.productosAux.find(producto => producto.idProd === id);
   // console.log(productoEncontrado)
    if (productoEncontrado) {
      this.productos.push(productoEncontrado);
      this.productos.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    }
  }

  obtenerMayorId(lista: Ticket[]): number {
    if (lista.length === 0) {
      // Manejar el caso de una lista vacía según sea necesario
      return 1; // O lanzar un error, dependiendo de los requisitos
    }
  
    // Utilizar la función reduce para encontrar el mayor id
    const mayorId = lista.reduce((maxId, Ticket) => {
      // Convertir la propiedad id a número si es una cadena
      const id = typeof Ticket.idTicket === 'string' ? parseInt(Ticket.idTicket, 10) : Ticket.idTicket;
      return id !== undefined ? Math.max(maxId, id) : maxId;
    }, typeof lista[0].idTicket === 'string' ? parseInt(lista[0].idTicket, 10) : lista[0].idTicket || 0);
  
  
    return mayorId;
  }

  capturarFecha(fecha: NgbDateStruct) {
    this.fechaSeleccionada = fecha;
    // Puedes realizar otras acciones con la fecha seleccionada aquí
  }

}
