import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';
import { AngularFirestore } from '@angular/fire/firestore';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  @Input() reciepe: any;
  @Input() time: any;
  @Input() date: any;
  infoRecipe: any;
  foodTime: any;
  constructor(private afs: AngularFirestore) {

   }

  ngOnInit(): void {
        this.infoRecipe=this.afs.collection('infoRecipe', ref => ref.where('uid', '==', this.reciepe)).valueChanges();
    //console.log(this.time,this.date);
    this.foodTime=this.afs.collection('foodTime', ref => ref.where('uid', '==', this.time)).valueChanges();
  }
 
}
