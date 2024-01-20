// producto.model.ts
export interface Producto {
    id?: string,
    idProd?: number,
    Nombre: string;
    Articulos: Articulo[];
    PrecioTotal: number;
    idUser?: number;
  }
  
  export interface Articulo {
    NombreArticulo: string;
    Cantidad: number;
    idProducto?: number;
    id?: string;
    idUser?: number;
  }
  
  export interface Ticket {
    id?: string,
    idTicket?: number,
    NombrePersona: string;
    Articulos: Articulo[];
    Total: number;
    Fecha?: Date;
    Fechastr?: string;
    idUser?: number;
  }