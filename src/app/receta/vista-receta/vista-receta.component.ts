import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../service/receta.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vista-receta',
  templateUrl: './vista-receta.component.html',
  styleUrls: ['./vista-receta.component.css']
})
export class VistaRecetaComponent implements OnInit {

  points: number = 0;//puntos de la reseta 
  typeKitchen: string;
  cookud = new Array();//uid del utensilio
  uidunit = new Array();//uid de la unidad 
  ingredienuid :string[];//uid del ingrediente
  cant = new Array();//cantidad 
  step = new Array();//paso
  imageStep = new Array();//array de imagenes
  technique = new Array();
  urlImage: string;
  urlVideo: any;
  portions: any;
  title: any;
  cookTime: any;
  recipe: any;
  infoRecipe: any;
  constructor(private firestore:AngularFirestore, private storage: AngularFireStorage, private RecipeService:RecetaService,private router:Router) { 


  }

  ngOnInit(): void {
    console.log(this.router.url.slice(8));
    this.RecipeService.retrieveUserDocumentFromRecipe(this.router.url.slice(8)).subscribe(recipe => {
      if (recipe[0]) {
        const recipeVar: any = recipe[0];
        this.infoRecipe = recipe[0];
        this.urlImage = recipeVar.principalPhoto;
        this.typeKitchen = recipeVar.kitchenArea;
        this.portions = recipeVar.portions;
        this.urlImage = recipeVar.principalPhoto;
        this.cookud = recipeVar.uidsCookWare;
        this.title = recipeVar.title;
        this.cookTime = recipeVar.cookTime;
        this.ingredienuid = recipeVar.uidsIngredients;
     }
    });
    console.log(this.ingredienuid);
  }

}