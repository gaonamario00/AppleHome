import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Articulo, Producto } from '../../../Models/Models';
import { ToastrService } from 'ngx-toastr';
import { ArticuloConjuntoService } from '../../../services/articulo-conjunto.service';
import { ArticuloIndividualService } from '../../../services/articulo.individual.service';

@Component({
  selector: 'app-prod-conjunto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './prod-conjunto.component.html',
  styleUrl: './prod-conjunto.component.css'
})
export class ProdConjuntoComponent {

  constructor(private formBuilder: FormBuilder, 
    private _articuloConjService: ArticuloConjuntoService,
    private _articuloIndService: ArticuloIndividualService, 
    private toastr: ToastrService){}

  prodConjuntoForms!: FormGroup;
  productosIndPre: Articulo[] = [];
  productosInd: Producto[] = [];
  productosConj: Producto[] = [];
  productosAux: Producto[] = [];
  nombreInd: string = '';
  precioInd: number = 0;
  id: string | undefined;
  idProd: number | undefined;

  ngOnInit() {
    this.buildForm();
    this.getProductosIndividuales();
    this.listarProdConj();
  }

  buildForm() {
    this.prodConjuntoForms = this.formBuilder.group({
      nombreConj: ['', Validators.required],
      precioConj: ['', [Validators.required]],
      productoSeleccionado: ['', Validators.required],
      cantidadInd: ['', Validators.required]
    });
  }

  guardarProdConj(){
    if(this.id === undefined){
      // Agregar
      this.agregarProductoConj();
    }else{
      //Editar
      //this.editarProdInd(this.id);
    }
  }


  agregarProductoConj() {

    const nombre = this.prodConjuntoForms.value.nombreConj;
    const precioTotal = this.prodConjuntoForms.value.precioConj;

    const prodConj: Producto = {
      idProd: this.productosConj.length + 1,
      Nombre: nombre,
      Articulos: this.productosIndPre,
      PrecioTotal: precioTotal
    };
    //this.productosConj.push(prodConj);
    this._articuloConjService.guardarArticuloConjunto(prodConj).then(()=>{
      this.productosIndPre = [];
      this.getProductosIndividuales();
      console.log("Producto Conjunto registrado");  
      this.toastr.success("Producto registrado con exito!");
      this.prodConjuntoForms.reset();
      this.prodConjuntoForms.get('productoSeleccionado')?.setValue("");
      this.prodConjuntoForms.get('cantidadInd')?.setValue("");
        }, error =>{
      //console.log(error);
      this.toastr.error("Ha ocurrido un error");
    });
  }

  onProductoSeleccionado(event: any) {
    const selectedProductName = event.target.value;
    const selectedProduct = this.productosInd.find(p => p.Nombre === selectedProductName);

    if (selectedProduct) {
      const idProd = selectedProduct.idProd;
      this.idProd = idProd;
      console.log('idProd seleccionado:', idProd);
    }
  }

  getProductosIndividuales(){
    
    this._articuloIndService.listarProductosIndividuales().subscribe(res =>{
      //console.log(res);
      this.productosInd = res;
      this.productosAux = res;
      console.log(this.productosAux)
      this.productosInd.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    });
  }

  agregarProductoAListaPre(){
    const idProducto = this.idProd;
    const productoSeleccionado = this.prodConjuntoForms.get('productoSeleccionado')?.value;
    const cantidadInd = this.prodConjuntoForms.get('cantidadInd')?.value;

    // Obtener el producto correspondiente a partir del nombre
    const productoEncontrado = this.productosInd.find(p => p.Nombre === productoSeleccionado);

    // Agregar el producto a la lista productosIndPre
    if (productoEncontrado) {
      this.productosIndPre.push({
        idProducto: idProducto, 
        NombreArticulo: productoEncontrado.Nombre, 
        Cantidad: cantidadInd,
        id: productoEncontrado.id
      });
    }

    this.productosInd = this.productosInd.filter(prod => prod.Nombre !== productoEncontrado?.Nombre);
    this.idProd = undefined;
    this.prodConjuntoForms.get('productoSeleccionado')?.setValue("");
    this.prodConjuntoForms.get('cantidadInd')?.setValue("");
  }


  listarProdConj(){
    this._articuloConjService.listarProductosConjuntos().subscribe(res =>{
      //console.log(res);
      this.productosConj = res;
      this.productosConj.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    });
  }

  
  eliminarProductoConj(id: any): void {
    this._articuloConjService.eliminarProductoConjunto(id).then(() => {
      console.log("Pruducto eliminado "+id);
      //this.listarProdInd();
    }).catch(error => {
      console.error('Error al eliminar el producto:', error);
    });
  }

  eliminarProdIndPre(art: Articulo){
    let index:number = this.productosIndPre.indexOf(art);
    if (index !== -1) {
      this.productosIndPre.splice(index, 1);
    }
    if(art.idProducto !== undefined){
      this.addPreToSelect(art.idProducto);
    }
    
  }


  addPreToSelect(id: number){
    console.log(id);
    console.log(this.productosAux);
    const productoEncontrado = this.productosAux.find(producto => producto.idProd === id);
    console.log(productoEncontrado)
    if (productoEncontrado) {
      this.productosInd.push(productoEncontrado);
      this.productosInd.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    }
  }
  


}

