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
     count:string[];
   //Verificar existencia del utensilio
  public CookwareData(cookware: cookWare,uiserr:any): void{
    if (this.flag2) {
      this.afs.collection('cookWare', ref => ref.where('nameCookWare', '==', cookware.nameCookWare)).valueChanges().subscribe(users => {
        if (users[0]) {
         if (this.flag == false) {
            this.uidCookWare = users[0];
            this.uid = this.uidCookWare["uid"];
            this.uidCookWare["request"].push(uiserr);
            console.log(this.uid, "  ", this.uidCookWare["request"]," ",this.count);
           this.CookwareDataUpdate(this.uidCookWare["request"]);
            this.flag2 = false;
          }
        } else {
          console.log("no existo");
          this.CookwareDataAdd(cookware);
          this.flag2 = false;
        }
      });
    }
  }

  //Validación de números mínimos de request para agregar utensilio
  public CookwareDataUpdate(request:string[]) {
    this.flag = true;
   // console.log(this.uid, "  ", request);
   this.afs.collection("cookWare")
    .doc(this.uid)
      .set({ request: request }, { merge: true });

  }
  //Agregar utensilio
  public CookwareDataAdd(cookware: cookWare) {
    this.flag = true;
    console.log(cookware);
    const userRef: AngularFirestoreDocument<cookWare> = this.afs.doc(
      `cookWare/${cookware.uid}`
    );
    const data: cookWare = {
      uid: cookware.uid,
      uidLevelCookWare: cookware.uidLevelCookWare,
      nameCookWare: cookware.nameCookWare,
      request : cookware.request
    };
    return userRef.set(data, { merge: true });
  }

}
