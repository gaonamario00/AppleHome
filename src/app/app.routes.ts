import { Routes } from '@angular/router';
import { ArticuloComponent } from './catalogos/articulo/articulo.component';
import { homeComponent } from './home/home.component';
import { AltaTicketComponent } from './tickets/alta-ticket/alta-ticket.component';

export const routes: Routes = [
    { path: '', component: homeComponent},
    { path: 'articulo', component: ArticuloComponent },
    {path: 'tickets', component: AltaTicketComponent},
];
