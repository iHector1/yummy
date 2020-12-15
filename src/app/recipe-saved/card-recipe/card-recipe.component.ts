import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-card-recipe',
  templateUrl: './card-recipe.component.html',
  styleUrls: ['./card-recipe.component.css']
})
export class CardRecipeComponent implements OnInit {
  @Input() uidRecipe: string;
  @Input() uidCategory: string;
  recipe: any;
  constructor(private afs: AngularFirestore) {
    //
   }

  ngOnInit(): void {
      this.recipe = this.afs.collection('infoRecipe', ref => ref.where('uid', "==", this.uidRecipe)).valueChanges();
      console.log(this.uidCategory);
  
    
  }

}
