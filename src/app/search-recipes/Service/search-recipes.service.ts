import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { createRecipe } from 'src/app/shared/models/recipe.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchRecipesService {

  private uidIngredient: any;
  private flag: boolean = false;
  private flag2: boolean = true;
  private uidkindfood;
  private requests;
  public ingredient$: Observable<createRecipe>;//Variable para guardar la receta


  constructor(private afs: AngularFirestore) { }
  uid: any;

  public recipeCollection(recipe: createRecipe, uiserr: any, food: any): void {
      this.afs.collection('recipe', ref => ref.where('title', '==', recipe.title)).valueChanges().subscribe(users => {
        if (users[0])
        {
         if (this.flag == false)
          {
            this.uidIngredient = users[0];
            this.uid = this.uidIngredient["uid"];
            this.recipeDataAdd(recipe);
          }
        }
      });
  }

  public recipeDataAdd(recipe: createRecipe) {
    this.flag = true;
    console.log(recipe);
    const userRef: AngularFirestoreDocument<createRecipe> = this.afs.doc(
      `${this.uidkindfood}/${recipe.uid}`
    );
    const data: any = {
      uid: recipe.uid,
      uidIngredient:recipe.uid
    };
    return userRef.set(data, { merge: true });
  }


}
