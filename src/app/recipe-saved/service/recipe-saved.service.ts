import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipeSavedService {

  constructor(private afs: AngularFirestore) { }

  checkRecipe(uidRecipe,uidUser) {
    return this.afs.collection('saved', ref => ref.where('uidUser', '==', uidUser).where('uidRecipe', '==', uidRecipe)).valueChanges();
  }

  saveRecipe(uidRecipe, uidUser,uidCategory) {
    const id = Math.random().toString(36).substring(2);
    const commentRef: AngularFirestoreDocument<any> = this.afs.doc(`saved/${id}`);
    return commentRef.set({uid:id,uidRecipe:uidRecipe,uidUser:uidUser,uidCategory:uidCategory}, { merge: true });    
  }
  deleteRecipe(uidRecipe,uidUser) {
    this.checkRecipe(uidRecipe, uidUser).subscribe(infoRecipe => {
      if (infoRecipe[0]) {
        const recipe: any = infoRecipe[0];
        this.afs.collection('saved').doc(recipe.uid).delete();
      }
    })
  }
}
 