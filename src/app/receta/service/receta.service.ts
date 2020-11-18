import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { title } from 'process';
import { Observable } from 'rxjs';
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

  //Agregar receta
  public RecipeDataAdd(recipe: infoRecipe) {
    console.log(recipe);
    const userRef: AngularFirestoreDocument<infoRecipe> = this.afs.doc(
      `infoRecipe/${recipe.uid}`
    );
    const data: infoRecipe = {
      uid: recipe.uid,
      title:recipe.title,
      uidUser:recipe.uidUser,
      cookTime:recipe.cookTime,   //aqui
      uidsIngredients: recipe.uidsIngredients,
      principalPhoto: recipe.principalPhoto,
      uidUnit: recipe.uidUnit, //aqui
      uidsCookWare : recipe.uidsCookWare,
      uidCategory: recipe.uidCategory,
      points:recipe.points,
      uidRegion :  recipe.uidRegion, 
      count:recipe.count,
      uidCollection :  recipe.uidCollection,
      uidSeason :  recipe.uidSeason,
      steps :   recipe.steps,
      stepsPhoto :   recipe.stepsPhoto,
      uidsTechnique :   recipe.uidsTechnique,
      portions :  recipe.portions,
      portionCalories : recipe.portionCalories ,
      urlVideo: recipe.urlVideo,
      kitchenArea: recipe.kitchenArea,
      timeStamp :  recipe.timeStamp,  //aqui
    };
    return userRef.set(data, { merge: true });
  }

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
      uidsCookWare: recipe.uidsCookWare,
      uidUnit: recipe.uidUnit
    };
    return userRef.set(data, { merge: true });
  }


  retrieveUserDocumentFromRecipe(recipe){
    return this.afs.collection('infoRecipe', ref => ref.where('uid', '==', recipe)).valueChanges();
  }

}
