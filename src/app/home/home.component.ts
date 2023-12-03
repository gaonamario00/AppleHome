import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { AppComponent } from "../app.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, HeaderComponent, AppComponent]
})
export class homeComponent {

    constructor(private router: Router) { }

    navigateToArticulo() {
        this.router.navigate(['/articulo']);
      }
    
    navigateToTickets(){
        this.router.navigate(['/tickets']);
    }

    navigateToReportes(){
        this.router.navigate(['/reportes']);
    }

}
