import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { myCupboard } from 'src/app/shared/models/myCupboaed.interface';

@Injectable({
  providedIn: 'root'
})
export class CupboardServiceService {
  private list: any;
  private cant: number;
  private flag: boolean = true;
  private flag2: boolean = true;
  public superlist$: Observable<myCupboard>;//Variable para guardar el utensilio


  constructor(private afs: AngularFirestore) { }

  public cupboardCollection(myCupboard: myCupboard): void {
    this.flag2 = true;
    this.flag = true;
    if (this.flag2) {
      this.afs.collection('myCupboard', ref => ref.where('uidUser', '==', myCupboard.uidUser).where('uidIngredient', '==', myCupboard.uidIngredient).where('uidUnit', '==', myCupboard.uidUnit)).valueChanges().subscribe(users => {
        if(this.flag){
        if (users[0]) {
          this.list = users[0];
          this.cant = this.list['cant'];
          this.myCupboardUpdate(myCupboard);
          window.alert("Lista actualizada");
        } else {
          this.myCupboardDataAdd(myCupboard);
          window.alert("Ingrediente en la alacena");
          this.flag2 = false;
          this.flag = false;
          }
        }
      });
    }
  }

  //Actualizar la alacena
  myCupboardUpdate(myCupboard: myCupboard) {
    let c = this.cant + myCupboard.cant;
    this.flag2 = false;
    this.flag = false;
   this.afs.collection('myCupboard')
    .doc(this.list['uid'])
     .set({ cant:c }, { merge: true });
  }

  //Agregar ingrediente a la alacena
  public myCupboardDataAdd(myCupboard: myCupboard) {
    this.flag2 = false;
    this.flag = false;
    const myCupboardRef: AngularFirestoreDocument<myCupboard> = this.afs.doc(
      `myCupboard/${myCupboard.uid}`
    );
    const data: myCupboard = {
      uidUser:myCupboard.uidUser,
      uid: myCupboard.uid,
      uidIngredient: myCupboard.uidIngredient,
      cant: myCupboard.cant,
      uidUnit : myCupboard.uidUnit
    };
    return myCupboardRef.set(data, { merge: true });
  }
  deleteItems(userUid,uidproduct){
    const items=this.afs.collection('myCupboard', ref => ref.where("uidUser", "==", userUid)).doc(uidproduct).delete();
 }

}
