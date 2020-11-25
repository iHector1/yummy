import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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
  createChat(uidUser1,uidUser2,name1,name2) {
    this.afs.collection("room", ref => ref.where("users", "array-contains", uidUser1).where("users", "array-contains", uidUser2)).valueChanges().subscribe(room => {
      if (room[0]) {
        
      } else {

      }
    })
  }
}
