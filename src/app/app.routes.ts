import { Routes } from '@angular/router';
import { ArticuloComponent } from './catalogos/articulo/tipo-articulo.component';
import { homeComponent } from './home/home.component';
import { AltaTicketComponent } from './tickets/alta-ticket/alta-ticket.component';
import { ReportesComponent } from './reportes/reportes.component';

export const routes: Routes = [
    { path: '', component: homeComponent},
    { path: 'articulo', component: ArticuloComponent },
    {path: 'tickets', component: AltaTicketComponent},
    {path: 'reportes', component: ReportesComponent}
];
