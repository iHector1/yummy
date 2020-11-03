import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private uidRecipe: any;
  public recipe$: Observable<infoRecipe>;//Variable para guardar el utensilio
  private recipeCollection: AngularFirestoreCollection<infoRecipe>;

  constructor(private afs: AngularFirestore) { }

  //Agregar receta
  public RecipeDataAdd(recipe: infoRecipe) {
    console.log(recipe);
    const userRef: AngularFirestoreDocument<infoRecipe> = this.afs.doc(
      `infoRecipe/${recipe.uid}`
    );
    const data: infoRecipe = {
      uid: recipe.uid,
      title: recipe.title,
      uidCategory: recipe.uidCategory,
      uidCollection: recipe.uidCollection,
      uidSeason: recipe.uidSeason,
      uidsCookWare: recipe.uidsCookWare
    };
    return userRef.set(data, { merge: true });
  }

}
