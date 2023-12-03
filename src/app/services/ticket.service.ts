import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ticket } from '../Models/Models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private fireStore: AngularFirestore) { }

  guardarTicket(articuloConj: Ticket): Promise <any>{
    return this.fireStore.collection('Tickets').add(articuloConj);
  }

  listarTickets(): Observable<Ticket[]> {
    return this.fireStore.collection('Tickets').snapshotChanges().pipe(
        map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Ticket;
            const id = a.payload.doc.id;
            return {id, ...data};
        }))
    );
  }

  eliminarTickets(id: string): Promise<void> {
    return this.fireStore.collection('Tickets').doc(id).delete();
  }

  getTicket(documentId: string): Observable<Ticket> {
      const path = "Tickets/"+documentId;
      const docRef  = this.fireStore.collection("Tickets").doc(documentId);
      console.log(docRef);
      return docRef.snapshotChanges().pipe(
        map((changes) => {
          const data = changes.payload.data() as Ticket;
          console.log(data);
          const id = changes.payload.id;
          return { id, ...data };
        })
      );
  }

}
