// producto.model.ts
export interface Producto {
    id?: string,
    Nombre: string;
    Articulos: Articulo[];
    PrecioTotal: number;
  }
  
  export interface Articulo {
    NombreArticulo: string;
    Cantidad: number;
  }
  