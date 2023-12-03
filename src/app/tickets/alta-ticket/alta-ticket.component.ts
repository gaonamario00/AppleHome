import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo, Producto, Ticket } from '../../Models/Models';
import { ArticuloIndividualService } from '../../services/articulo.individual.service';
import { ArticuloConjuntoService } from '../../services/articulo-conjunto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alta-ticket',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './alta-ticket.component.html',
  styleUrl: './alta-ticket.component.css'
})
export class AltaTicketComponent {

  constructor(private formBuilder: FormBuilder,
    private _articuloConjService: ArticuloConjuntoService,
    private _articuloIndService: ArticuloIndividualService, 
    private toastr: ToastrService){}

  ticketForms!: FormGroup;
  productosConjPre: Articulo[] = [];
  productosConj: Producto[] = [];
  ticket: Ticket[] = [];
  productosAux: Producto[] = [];
  nombreConj: string = '';
  precioConj: number = 0;
  id: string | undefined;
  idProd: number | undefined;





  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.ticketForms = this.formBuilder.group({
      nombreTicket: ['', Validators.required],
      precioTotalTicket: ['', [Validators.required]],
      productoSeleccionado: ['', Validators.required],
      cantidadConj: ['', Validators.required]
    });
  }

  guardarTicket() {
  }

  onProdConjSeleccionado(event: any){

  }

  getProductosConj(){

  }

  agregarProductoAListaPre(){

  }

  listarTickets(){

  }

  eliminarTicket(id: any): void{

  }

  eliminarProdConjPre(art: Articulo){

  }

  addPreToSelect(id: number){
    
  }
}
