import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Producto } from '../../../Models/Models';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ArticuloIndividualService } from '../../../services/articulo.individual.service';
import { ToastrService } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-prod-individual',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    AngularFireModule, 
    AngularFirestoreModule,
    ],
  templateUrl: './prod-individual.component.html',
  styleUrl: './prod-individual.component.css'
})
export class ProdIndividualComponent implements OnInit {

  //#region Formulario Productos Individuales
  prodIndividualForms!: FormGroup;

  productosInd: Producto[] = [];
  nombreInd: string = '';
  precioInd: number = 0;
  id: string | undefined;

  constructor(private formBuilder: FormBuilder, 
    private _articuloIndService: ArticuloIndividualService, 
    private toastr: ToastrService){}

  ngOnInit() {
    this.buildForm();
    this.listarProdInd();
    this._articuloIndService.getProdInd().subscribe(res =>{
      this.id = res.id;
      this.prodIndividualForms.patchValue({
        nombreInd: res.Nombre,
        precioInd: res.PrecioTotal
      })
    })
  }

  buildForm() {
    this.prodIndividualForms = this.formBuilder.group({
      nombreInd: ['', Validators.required],
      precioInd: ['', [Validators.required]]
    });
  }

  guardarProdIndividual(){
    if(this.id === undefined){
      // Agregar
      this.agregarProductoInd();
    }else{
      //Editar
      this.editarProdInd(this.id);
    }
  }

  agregarProductoInd() {

    const nombre = this.prodIndividualForms.value.nombreInd;
    const precioTotal = this.prodIndividualForms.value.precioInd;

    const prodInd: Producto = {
      idProd: this.productosInd.length+1,
      Nombre: nombre,
      Articulos: [],
      PrecioTotal: precioTotal
    };
    //this.productosInd.push(prodInd);
    this._articuloIndService.guardarArticuloIndividual(prodInd).then(()=>{
      //console.log("Producto individual registrado");  
      this.toastr.success("Producto registrado con exito!");
      this.prodIndividualForms.reset();
        }, error =>{
      //console.log(error);
      this.toastr.error("Ha ocurrido un error");
    });
  }

  listarProdInd(){
    this._articuloIndService.listarProductosIndividuales().subscribe(res =>{
      //console.log(res);
      this.productosInd = res;
      this.productosInd.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    });
  }

  eliminarProducto(id: any): void {
    //const productId = id ?? ''; // Asigna '' si id es undefined
    this._articuloIndService.eliminarProductoInd(id).then(() => {
      console.log(id);
      //this.listarProdInd();
    }).catch(error => {
      console.error('Error al eliminar el producto:', error);
    });
  }

  editarProdIndSelect(prodInd: Producto){
    this._articuloIndService.addProdIndEdit(prodInd);
  }

  editarProdInd(id: string){

    const nombre = this.prodIndividualForms.value.nombreInd;
    const precioTotal = this.prodIndividualForms.value.precioInd;

    const prodInd: any = {
      //idProd: this.productosInd.length+1,
      Nombre: nombre,
      Articulos: [],
      PrecioTotal: precioTotal// Precio del artículo
    };

    console.log(prodInd);

    this._articuloIndService.editarProductoInd(id,prodInd).then(() => {
      console.log("Individuales/"+id);
      this.toastr.info("Producto Actualizado exitosamente!");
    }, error => {
      this.toastr.info("Ha ocurrido un error");
    });
  }

  cancelarEditar(){
    this.id = undefined;
    this.prodIndividualForms.reset()
  }

}
