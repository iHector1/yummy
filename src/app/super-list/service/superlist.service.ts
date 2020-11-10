import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { superList } from 'src/app/shared/models/superList.interface';

@Injectable({
  providedIn: 'root'
})
export class SuperlistService {
  private uidCookWare: any;
  private flag: boolean = false;
  private flag2: boolean = true;
  public superlist$: Observable<superList>;//Variable para guardar el utensilio
  //private cookWareCollection: AngularFirestoreCollection<cookWare>;

  constructor(private afs: AngularFirestore) { }



    //Agregar utensilio
    public superlistDataAdd(superList: superList) {
      this.flag = true;
     // console.log(cookware);
      const superListRef: AngularFirestoreDocument<superList> = this.afs.doc(
        `superList/${superList.uid}`
      );
      const data: superList = {
        uid: superList.uid,
        uidIngredient: superList.uidIngredient,
        cant: superList.cant,
        uidUnit : superList.uidUnit
      };
      return superListRef.set(data, { merge: true });
    }
}
