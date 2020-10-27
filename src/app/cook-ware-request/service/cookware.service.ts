import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { cookWare } from 'src/app/shared/models/cookWare.interface';

@Injectable({
  providedIn: 'root'
})
export class CookwareService {

  private uidCookWare: any;
  private flag: boolean = false;
  private flag2: boolean = true;
  public cookware$: Observable<cookWare>;//Variable para guardar el utensilio
  private cookWareCollection: AngularFirestoreCollection<cookWare>;

  constructor(private afs: AngularFirestore) {
  }
     uid: any;
     count:any;
   //Verificar existencia del utensilio
  public CookwareData(cookware: cookWare): void{
    if (this.flag2) {
      this.afs.collection('cookWare', ref => ref.where('nameCookWare', '==', cookware.nameCookWare)).valueChanges().subscribe(users => {
        if (users[0]) {
          if (this.flag == false) {
            this.uidCookWare = users[0];
            this.uid = this.uidCookWare["uid"];
            this.count = this.uidCookWare["request"];
            console.log(this.uid, "  ", this.count);
            this.CookwareDataUpdate();
            this.flag2 = false;
          }
        } else {
          console.log("no xisto", users[0]);
          this.CookwareDataAdd(cookware);
          this.flag2 = false;
        }
      });
    }
  }




  //Validación de números mínimos de request para agregar utensilio
  public CookwareDataUpdate() {
    this.flag = true;
    console.log(this.uid, "  ", this.count);
    let count2 = this.count;
    count2 = count2 + 1;
    console.log(count2);
   this.afs.collection("cookWare")
    .doc(this.uid)
      .set({ request: count2 }, { merge: true });
    
  }

  //Agregar utensilio
  public CookwareDataAdd(cookware: cookWare) {
    const userRef: AngularFirestoreDocument<cookWare> = this.afs.doc(
      `cookWare/${cookware.uid}`
    );
    const data: cookWare = {
      uid: cookware.uid,
      uidLevelCookWare: cookware.uidLevelCookWare,
      nameCookWare: cookware.nameCookWare,
      //request: 1
      request : cookware.request
    };
    return userRef.set(data, { merge: true });
  }

}
