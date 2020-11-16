import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { superList } from 'src/app/shared/models/superList.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperlistService {
  private list: any;
  private cant: number;
  private flag: boolean = true;
  private flag2: boolean = true;
  public superlist$: Observable<superList>;//Variable para guardar el utensilio

  constructor(private afs: AngularFirestore) { }
  public superListCollection(superList: superList): void {
    this.flag2 = true;
    this.flag = true;
    if (this.flag2) {
      this.afs.collection('superList', ref => ref.where('uidUser', '==', superList.uidUser).where('uidIngredient', '==', superList.uidIngredient).where('uidUnit', '==', superList.uidUnit)).valueChanges().subscribe(users => {
        if(this.flag){
        if (users[0]) {
          this.list = users[0];
          this.cant = this.list['cant'];
          this.superListUpdate(superList);
          window.alert("Lista actualizada");
        } else {
          this.superlistDataAdd(superList);
          window.alert("Ingrediente en la lista ");
          this.flag2 = false;
          this.flag = false;
          }
        }
      });
    }
  }
  //actializar la lista 
  superListUpdate(superList: superList) {
    let c = this.cant + superList.cant;
    this.flag2 = false;
    this.flag = false;
   this.afs.collection('superList')
    .doc(this.list['uid'])
     .set({ cant:c }, { merge: true });
  }
    //Agregar ingrediente a la lista 
    public superlistDataAdd(superList: superList) {
      this.flag2 = false;
      this.flag = false;
      const superListRef: AngularFirestoreDocument<superList> = this.afs.doc(
        `superList/${superList.uid}`
      );
      const data: superList = {
        uidUser:superList.uidUser,
        uid: superList.uid,
        uidIngredient: superList.uidIngredient,
        cant: superList.cant,
        uidUnit : superList.uidUnit
      };
      return superListRef.set(data, { merge: true });
    }
}
