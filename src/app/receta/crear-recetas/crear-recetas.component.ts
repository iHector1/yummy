import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';
import { RecetaService } from '../service/receta.service';

@Component({
  selector: 'app-crear-recetas',
  templateUrl: './crear-recetas.component.html',
  styleUrls: ['./crear-recetas.component.css']
})
export class CrearRecetasComponent implements OnInit {
  //uid?: string;
  titleRecipe: Observable<any[]>;// Variable para recibir el nombre de la receta
  //cookTimeRecipe: Observable<any[]>;// Variable para recibir los minutos
  //uidsIngredients: Observable<any[]>;// Variable para recibir los ingredientes
  uidsCookWare: Observable<any[]>;// Variable para recibir los utensilios
  uidCategory: Observable<any[]>;// Variable para recibir la categoría
  //uidRegion?: string;
  uidCollection: Observable<any[]>;// Variable para recibir la colección
  uidSeason: Observable<any[]>;// Variable para recibir la temporada
  //steps?: string[];
  //stepsPhoto: Observable<any[]>;// Variable para recibir la imagen
  //uidsTechnique: Observable<any[]>;// Variable para recibir la técnica
  //portions: Observable<any[]>;// Variable para recibir las porciones
  //portionCalories: Observable<any[]>;// Variable para recibir las calorías
  //urlVideo?: string;
  //timeStamp?: Date;  //aqui
  //stars?: number;

  //variables del formulario
  recipeForm = new FormGroup({
    title: new FormControl('', [
    ]),
    /*cookTime: new FormControl('', [
    ]),
    uidsIngredients: new FormControl('',[
    ]),*/
    uidsCookWare: new FormControl('', [
    ]),
    uidCategory: new FormControl('', [
    ]),
    uidCollection: new FormControl('', [
    ]),
    uidSeason: new FormControl('', [
    ]),
    /*stepsPhoto: new FormControl('', [
    ]),
    uidsTechnique: new FormControl('', [
    ]),
    portions: new FormControl('', [
    ]),
    portionsCalories: new FormControl('', [
    ]) */
  });

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private cookWareService:RecetaService,private authService:AuthService) {
    //this.uidsIngredients = firestore.collection(' ').valueChanges();
    this.uidsCookWare = firestore.collection('cookWare').valueChanges();
    this.uidCategory = firestore.collection('category').valueChanges();
    this.uidCollection = firestore.collection('collection').valueChanges();
    this.uidSeason = firestore.collection('season').valueChanges();
    //this.uidsTechnique = firestore.collection(' ').valueChanges();
   }

  ngOnInit(): void {
  }

  async create_recipe() {
    try {
      const { recipeTitle, recipeCategory, recipeCollection, recipeSeason, recipeCookware } = this.recipeForm.value;
      if(recipeTitle ==" "){
        window.alert("Por favor que no esten vacíos ");
      } else if(recipeTitle =="  "){
        window.alert("Por favor que no esten vacíos ");
      }
      else if(recipeTitle =="   "){
        window.alert("Por favor que no esten vacíos ");
      }
      else if(recipeTitle =="    "){
        window.alert("Por favor que no esten vacíos ");
      }
      else if(recipeTitle =="     "){
        window.alert("Por favor que no esten vacíos ");
      }
     else {
       const id = Math.random().toString(36).substring(2);
        let titleC = recipeTitle;
        const recipeInfo: infoRecipe = {
          uid: id,
          title: titleC,
          uidCategory: recipeCategory,
          uidCollection: recipeCollection,
          uidSeason: recipeSeason,
          uidsCookWare: recipeCookware
        };
        console.log(recipeInfo);
        this.cookWareService.RecipeDataAdd(recipeInfo /*,this.inputUserid.nativeElement.value*/);
     }
    }
    catch (error) {
      console.log(error);
    }
  }

}
