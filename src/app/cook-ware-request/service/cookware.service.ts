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

  public cookware$: Observable<cookWare>;//Variable para guardar el utensilio
  private cookWareCollection: AngularFirestoreCollection<cookWare>;

  constructor(private afs: AngularFirestore) {
  }

   //Verificar existencia del utensilio
   public CookwareData(cookware: cookWare):void{
    this.afs.collection('cookWare', ref => ref.where('nameCookWare','==',cookware.nameCookWare)).valueChanges().subscribe(user => {
      if (user[0]) {
        console.log("Si existe el utensilio", user.values.name);
      } else {
        console.log("No existe el utensilio");
        this.CookwareDataAdd(cookware);
      }
    });
  }




  //Validación de números mínimos de request para agregar utensilio
  public CookwareDataVerif(cookware: cookWare){


    return this.afs.collection('cookWare', ref => ref.where ('request', '>=', 3)).snapshotChanges();
  }

  //Agregar utensilio
  public CookwareDataAdd(cookware: cookWare) {
    this.CookwareDataVerif(cookware);
    return this.afs.collection('cookWare').add(cookware);
  }

}
