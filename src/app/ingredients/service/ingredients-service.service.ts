import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { ingredient} from '../../shared/models/ingredients.interface';
@Injectable({
  providedIn: 'root'
})
export class IngredientsServiceService {
  private uidIngredient: any;
  private flag: boolean = false;
  private flag2: boolean = true;
  private uidkindfood;
  private requests;
  public ingredient$: Observable<ingredient>;//Variable para guardar el ingrediente
  constructor(private afs: AngularFirestore) { }
  uid: any;
  public ingredientCollection(ingredient: ingredient, uiserr: any, food: any): void {
      this.afs.collection('ingredients', ref => ref.where('nameIngredient', '==', ingredient.nameIngredient)).valueChanges().subscribe(users => {
        if (users[0]) {
         if (this.flag == false) {
            this.uidIngredient = users[0];
           this.uid = this.uidIngredient["uid"];
          if(this.uidIngredient["requests"]<3){
           //verifica que el usuario no haya hecho solicitud otra vez 
           if (!this.uidIngredient["request"].some(x => x === uiserr)) {
             this.uidIngredient["request"].push(uiserr);
             this.requests=this.uidIngredient["request"];
             console.log(this.uid, "  ", this.requests.length);
             this.ingredientDataUpdate(this.uidIngredient["request"],this.requests.length); 
             window.alert("Haz hecho una  solicitud a este ingrediente. ");
             this.flag2 = false;
           } else {
             window.alert("Ya has hecho solicitud a este ingrediente,intenta con otro ");
            }
          } else {
            window.alert("Este ingrediente ya existe,intente con otro");
          }
          }
        } else {
          this.ingredientDataAdd(ingredient, food);
          this.ingredientDataAddtable(ingredient);
          window.alert("Haz hecho una  solicitud a este ingrediente ");
          this.flag2 = false;
        }
      });
  }
  ingredientDataUpdate(request: any,requests:any) {
    this.flag = true;
    console.log(this.uid, "  ", request);
   this.afs.collection("ingredients")
    .doc(this.uid)
     .set({ request: request, requests: requests }, { merge: true });
    
  }

  public ingredientDataAdd(ingredient: ingredient, food: any) {
    console.log(food);
    let foood = food;
     console.log(food);
    if (foood == "1") {
      this.uidkindfood = "oils";
    } else if (foood=="2") {
      this.uidkindfood = "meats";
    } else if (foood=="3") {
      this.uidkindfood = "cereals";
    } else if (foood=="4") {
      this.uidkindfood = "vegetables";
    }else if (foood=="5") {
      this.uidkindfood = "fruits";
    }

    this.flag = true;
    console.log(ingredient);
    const userRef: AngularFirestoreDocument<ingredient> = this.afs.doc(
      `${this.uidkindfood}/${ingredient.uid}`
    );
    const data: any = {
      uid: ingredient.uid,
      uidIngredient:ingredient.uid
    };
    return userRef.set(data, { merge: true });
  }

  ingredientDataAddtable(ingredient:ingredient) {
    console.log(ingredient);
    const userRef: AngularFirestoreDocument<ingredient> = this.afs.doc(
      `ingredients/${ingredient.uid}`
    );
    const data: ingredient = {
      uid: ingredient.uid,
      uidUnit: ingredient.uidUnit,
      nameIngredient: ingredient.nameIngredient,
      request : ingredient.request,
      requests:3
    };
    return userRef.set(data, { merge: true });
  }
}


