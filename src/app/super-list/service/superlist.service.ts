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
  // private flag: boolean = true;
  // private flag2: boolean = true;
  public superlist$: Observable<superList>;//Variable para guardar el utensilio

  constructor(private afs: AngularFirestore) { }
  public superListCollection(superList: superList): void {
    let flag2 = true;
    let flag = true;
    if (flag2) {
      this.afs.collection('superList', ref => ref.where('uidUser', '==', superList.uidUser).where('uidIngredient', '==', superList.uidIngredient).where('uidUnit', '==', superList.uidUnit)).valueChanges().subscribe(users => {
        if(flag){
        if (users[0]) {
          this.list = users[0];
          this.cant = this.list['cant'];
          flag2 = false;
          flag = false;
          this.superListUpdate(superList);
          window.alert("Lista actualizada");
        } else {
          flag2 = false;
          flag = false;
          this.superlistDataAdd(superList);
          window.alert("Ingrediente en la lista ");
          
          }
        }
      });
    }
  }
  //actializar la lista
  superListUpdate(superList: superList) {
    let c = Number(this.cant) + Number(superList.cant);
   this.afs.collection('superList')
    .doc(this.list['uid'])
     .set({ cant:c }, { merge: true });
  }
    //Agregar ingrediente a la lista
    public superlistDataAdd(superList: superList) {
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
  
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }
   deleteItems(userUid,uidproduct){
     const items=this.afs.collection('superList', ref => ref.where("uidUser", "==", userUid)).doc(uidproduct).delete();
  }
}
