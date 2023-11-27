import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdConjuntoComponent } from "./prod-conjunto/prod-conjunto.component";
import { ProdIndividualComponent } from "./prod-individual/prod-individual.component";


@Component({
    selector: 'app-articulo',
    standalone: true,
    templateUrl: './articulo.component.html',
    styleUrl: './articulo.component.css',
    imports: [CommonModule, ProdConjuntoComponent, ProdIndividualComponent]
})
export class ArticuloComponent {

  prodIndividual: boolean = true;

  // Puedes realizar acciones adicionales en este método
  cambioTipoProducto(selected: number) {
    switch (selected) {
      case 1:
        console.log("Producto individual");
        this.prodIndividual = true;
        break;
      case 2:
        console.log("Producto conjunto");
        this.prodIndividual = false;
        break;
    }
  }


}
