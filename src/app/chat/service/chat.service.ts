import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private pathParamState = new BehaviorSubject<string>('');
  pathParam: Observable<string>;
  constructor(private afs:AngularFirestore) { 


    this.pathParam = this.pathParamState.asObservable();
  }
//uid del chat 
  updatePathParamState(newPathParam: string): void {
    this.pathParamState.next(newPathParam);
  }
  //creacion del chat 
  createChat(uidUser1, uidUser2, name1, name2) {
    const nameRoom1 = name1 + "-" + name2;
    const nameRoom2 = name2 + "-" + name1;
    console.log("primer :",nameRoom1,"segundo :",nameRoom2);
    this.afs.collection("rooms", ref => ref.where("name", "==", nameRoom1)).valueChanges().subscribe(room => {
      if (room[0]) {
        console.log("si hay chat existente");
      } else {
        
        this.afs.collection("rooms", ref => ref.where("name", "==", nameRoom2)).valueChanges().subscribe(room2 => {
          if (room2[0]) {
            console.log("si hay chat existente");
          } else {
            console.log("crear");
            console.log("creando");
            const id = Math.random().toString(36).substring(2);
            const roomRef: AngularFirestoreDocument<any> = this.afs.doc(
              `rooms/${id}`
            );
            let data:any={
              id: id,
              name: name1 + "-" + name2,
              users:[uidUser1,uidUser2]
            };
            return roomRef.set(data, { merge: true });
          }
        });
      }
    });
  }
}
