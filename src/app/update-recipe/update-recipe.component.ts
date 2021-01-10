import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { infoRecipe } from '../shared/models/infoRecipe.interface';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {
  uidCategory: any;
  uidCollection: any;
  uidSeason: any;
  uidRegion: any;
  title: string;
  cooktime: any;
  portions: any;
  portionsCalories: any;
  category: string;
  season: string;
  region: string;
  collection: string;
  recipeForm = new FormGroup({
    title: new FormControl(''),
    cookTime: new FormControl(''),
    portions: new FormControl(''),
    portionsCalories: new FormControl(''), 
  });
  constructor(private afs:AngularFirestore,private router:Router) { 
    this.uidCategory = this.afs.collection('category').valueChanges();
    this.uidCollection = this.afs.collection('collection').valueChanges();
    this.uidSeason = this.afs.collection('season').valueChanges();
  
    this.uidRegion = this.afs.collection('region').valueChanges();
    this.afs.collection('infoRecipe', ref => ref.where('uid', '==', this.router.url.slice(8))).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        const infoRecipe: infoRecipe = recipe[0];
        this.title = infoRecipe.title;
        this.cooktime = infoRecipe.cookTime;
        this.portions = infoRecipe.portions;
        this.portionsCalories = infoRecipe.portionCalories;
        this.category =  infoRecipe.uidCategory;
        this.season = infoRecipe.uidSeason;
        this.collection = infoRecipe.uidCollection;
        this.region = infoRecipe.uidRegion;
      }
    });
  }
  
  ngOnInit(): void {
  }

  updateRecipe() {
    if (this.title==''||this.title==' '||this.title=='  '||this.title=='   '||this.cooktime==null||this.portions==null||this.portionsCalories==null) {
      window.alert('Completa todos los campos');
    } else {
      const data: infoRecipe = {
      title: this.title,
      cookTime: this.cooktime,
      uidCategory: this.category,
      uidCollection: this.collection,
      uidRegion: this.region,
      uidSeason: this.season,
      portions: this.portions,
      portionCalories: this.portionsCalories
      };
      console.log(data);
      window.alert('Receta Actualizada');
      this.afs.collection('infoRecipe').doc(this.router.url.slice(8)).set(data, { merge: true });
      this.router.navigate(['/home']);
   }
    
  }
}
