import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AvisoPruebaComponent } from '../aviso-prueba/aviso-prueba.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo, Producto } from '../../../Models/Models';

@Component({
  selector: 'app-prod-conjunto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './prod-conjunto.component.html',
  styleUrl: './prod-conjunto.component.css'
})
export class ProdConjuntoComponent {

  constructor(private formBuilder: FormBuilder){}

  prodConjuntoForms!: FormGroup;
  productosIndPre: Articulo[] = [];
  productosInd: Articulo[] = [];
  productosConj: Producto[] = [];
  nombreInd: string = '';
  precioInd: number = 0;

  ngOnInit() {
    this.buildForm();
    
    const prod: Articulo = {
      NombreArticulo: "TKT",
      Cantidad: 10
    };
    this.productosInd.push(prod);
    const prod2: Producto = {
      Nombre: "Ejemplo 2",
      Articulos: [],
      PrecioTotal: 234.33
    };
    this.productosConj.push(prod2);
    /*
    this.productosConj.push(prod);
    this.productosConj.push(prod);
    this.productosConj.push(prod);
    */
  }

  buildForm() {
    this.prodConjuntoForms = this.formBuilder.group({
      nombreConj: ['', Validators.required],
      precioConj: ['', [Validators.required]],
      productoSeleccionado: ['', Validators.required],
      cantidadInd: ['', Validators.required]
    });
  }

  guardarProductoConj() {
    // Puedes realizar acciones adicionales aquí, como enviar el formulario a un servidor.

    const nombre = this.prodConjuntoForms.value.nombreConj;
    const precioTotal = this.prodConjuntoForms.value.precioConj;

    const prodConj: Producto = {
      Nombre: nombre,
      Articulos: this.productosIndPre,
      PrecioTotal: precioTotal// Precio del artículo, puede obtenerse del formulario
    };
    this.productosConj.push(prodConj);
  }


  agregarProductoAListaPre(){
    const productoSeleccionado = this.prodConjuntoForms.get('productoSeleccionado')?.value;
    const cantidadInd = this.prodConjuntoForms.get('cantidadInd')?.value;

    // Obtener el producto correspondiente a partir del nombre
    const productoEncontrado = this.productosInd.find(p => p.NombreArticulo === productoSeleccionado);

    // Agregar el producto a la lista productosIndPre
    if (productoEncontrado) {
      this.productosIndPre.push({NombreArticulo: productoEncontrado.NombreArticulo, Cantidad: cantidadInd});
    }

    this.productosInd = this.productosInd.filter(prod => prod.NombreArticulo !== productoEncontrado?.NombreArticulo);


  }


}

