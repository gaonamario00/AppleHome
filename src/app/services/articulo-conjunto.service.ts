import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Producto } from '../Models/Models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticuloConjuntoService {

  constructor(private fireStore: AngularFirestore){}
  
  guardarArticuloConjunto(articuloConj: Producto): Promise <any>{
    return this.fireStore.collection('Conjuntos').add(articuloConj);
  }

  listarProductosConjuntos(): Observable<Producto[]> {
    return this.fireStore.collection('Conjuntos').snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Producto;
            const id = a.payload.doc.id;
            return {id, ...data};
        }))
    );
  }

  eliminarProductoConjunto(id: string): Promise<void> {
    return this.fireStore.collection('Conjuntos').doc(id).delete();
  }

  //No se usa
  getProdConjunto(documentId: string): Observable<Producto> {
      const path = "Conjuntos/"+documentId;
      const docRef  = this.fireStore.collection("Conjuntos").doc(documentId);
      console.log(docRef);
      return docRef.snapshotChanges().pipe(
        map((changes) => {
          const data = changes.payload.data() as Producto;
          console.log(data);
          const id = changes.payload.id;
          return { id, ...data };
        })
      );
  }

}
