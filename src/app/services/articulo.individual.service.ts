import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {  Producto } from "../Models/Models";
import { Observable, Subject, map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ArticuloIndividualService{

    private productoInd$ = new Subject<any>();

    constructor(private fireStore: AngularFirestore){}

    guardarArticuloIndividual(articuloInd: Producto): Promise <any>{
        return this.fireStore.collection('Individuales').add(articuloInd);
    }

    listarProductosIndividuales(): Observable<Producto[]> {
        return this.fireStore.collection('Individuales').snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data() as Producto;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        );
    }

    eliminarProductoInd(id: string): Promise<void> {
        return this.fireStore.collection('Individuales').doc(id).delete();
    }

    addProdIndEdit(prodInd: Producto){
        this.productoInd$.next(prodInd);
    }

    getProdInd(): Observable<Producto>{
        return this.productoInd$.asObservable();
    }

    editarProductoInd(id: string, prodInd: any): Promise<any>{
        console.log("Service" + id);
        return this.fireStore.collection('individuales').doc(id).update(prodInd);
    }

}