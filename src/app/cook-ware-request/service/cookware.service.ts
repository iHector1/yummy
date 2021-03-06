import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
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
  private requests: any;
  constructor(private afs: AngularFirestore) {
  }
     uid: any;
     count:string[];

  //Verificar existencia del utensilio
  public CookwareData(cookware: cookWare,uiserr:any): void{
    if (this.flag2) {
      this.afs.collection('cookWare', ref => ref.where('nameCookWare', '==', cookware.nameCookWare)).valueChanges().subscribe(cookWare => {
        if (cookWare[0]) {
         if (this.flag == false) {
            this.uidCookWare = cookWare[0];
           this.uid = this.uidCookWare["uid"];
           if (this.uidCookWare["requests"] < 3) {
             //verifica que el usuario no haya hecho solicitud otra vez
             if (!this.uidCookWare["request"].some(x => x === uiserr)) {
               this.uidCookWare["request"].push(uiserr);
               this.requests = this.uidCookWare["request"];
               //console.log(this.uid, "  ", this.uidCookWare["request"], " ", this.count);
               this.CookwareDataUpdate(this.uidCookWare["request"], this.requests.length);
               window.alert("Haz hecho una  solicitud a este utensilio ");
               this.flag2 = false;
             } else {
               window.alert("Ya has hecho solicitud a este utensilio ");
             }
           }
          }
        } else {
          this.CookwareDataAdd(cookware);
          this.flag2 = false;
        }
      });
    }
  }

  //hace un udate para insertar el nuevo usuario con la solicitud
  public CookwareDataUpdate(request:string[],requests:any) {
    this.flag = true;
    //console.log(this.uid, "  ", request);
   this.afs.collection("cookWare")
    .doc(this.uid)
      .set({ request: request ,requests:requests}, { merge: true });

  }

  //Agregar utensilio
  public CookwareDataAdd(cookware: cookWare) { 
    this.flag = true;
   // console.log(cookware);
    const cookAreRef: AngularFirestoreDocument<cookWare> = this.afs.doc(
      `cookWare/${cookware.uid}`
    );
    const data: cookWare = {
      uid: cookware.uid,
      uidLevelCookWare: cookware.uidLevelCookWare,
      nameCookWare: cookware.nameCookWare,
      request : cookware.request,
      requests:1
    };
    return cookAreRef.set(data, { merge: true });
  }
}
