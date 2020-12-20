import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { title } from 'process';
import { Observable } from 'rxjs';
import { comments } from 'src/app/shared/models/comments.interface';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private uidRecipe: any;
  private flag: boolean = true;
  public recipe$: Observable<infoRecipe>;//Variable para guardar la receta
  private recipeCollection: AngularFirestoreCollection<infoRecipe>;

  constructor(private afs: AngularFirestore) { }

  //Agregar receta a la colection
  public RecipeDataAdd(recipe: infoRecipe) {
    console.log(recipe);
    const userRef: AngularFirestoreDocument<infoRecipe> = this.afs.doc(
      `infoRecipe/${recipe.uid}`
    );
    return userRef.set(recipe, { merge: true });
  }

  //agregar receta a la colleciont recipe
  public RecipeDataAddRecipe(recipe: infoRecipe) {
    console.log(recipe);
    const userRef: AngularFirestoreDocument<infoRecipe> = this.afs.doc(
      `recipe/${recipe.uid}`
    );
    const data: infoRecipe = {
      uid: recipe.uid,
      title: recipe.title,
      uidCategory: recipe.uidCategory,
      uidCollection: recipe.uidCollection,
      uidSeason: recipe.uidSeason,
      timeStamp :  recipe.timeStamp,
      uidUser:recipe.uidUser
    };
    return userRef.set(data, { merge: true });
  }

//recibir la receta mediante uid
  retrieveUserDocumentFromRecipe(recipe){
    return this.afs.collection('infoRecipe', ref => ref.where('uid', '==', recipe)).valueChanges();
  }

  //actualizacion de request y dificultad
  updateRecipe(requests: any, stars:any,difficult:any,uidRecipe:any) {
    this.afs.collection('infoRecipe').doc(uidRecipe).set({ requests: requests, stars: stars, difficult: difficult }, { merge: true });
  }

}
