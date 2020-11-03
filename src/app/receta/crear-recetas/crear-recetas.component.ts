import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'firebase';
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
  titleRecipe: Observable<any[]>;// Variable para recibir el nombre de la receta
  //uidsIngredients: Observable<any[]>;// Variable para recibir los ingredientes
  uidUnit: Observable<any[]>;//Variable para recibir las unidades de medida de los ingredientes
  uidsCookWare: Observable<any[]>;// Variable para recibir los utensilios
  uidCategory: Observable<any[]>;// Variable para recibir la categoría
  uidCollection: Observable<any[]>;// Variable para recibir la colección
  uidSeason: Observable<any[]>;// Variable para recibir la temporada

  //variables del formulario
  recipeForm = new FormGroup({
    title: new FormControl('', [
    ]),
    /*cookTime: new FormControl('', [
    ]),
    uidsIngredients: new FormControl('',[
    ]),*/
    uidUnit: new FormControl('', [
    ]),
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
    this.uidUnit = firestore.collection('unit').valueChanges();
    this.uidsCookWare = firestore.collection('cookWare').valueChanges();
    this.uidCategory = firestore.collection('category').valueChanges();
    this.uidCollection = firestore.collection('collection').valueChanges();
    this.uidSeason = firestore.collection('season').valueChanges();
    //this.uidsTechnique = firestore.collection(' ').valueChanges();
   }

  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;
  ngOnInit(): void {
  }

  async create_recipe() {
    try {
      const { recipeTitle, recipeCategory, recipeCollection, recipeSeason, recipeCookware, recipeUnit } = this.recipeForm.value;
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
          title: recipeTitle,
          uidCategory: recipeCategory,
          uidCollection: recipeCollection,
          uidSeason: recipeSeason,
          uidsCookWare: recipeCookware,
          uidUnit: recipeUnit
          //request: [this.inputUserid.nativeElement.value]
        };
        console.log(recipeInfo);
        this.cookWareService.RecipeDataAdd(recipeInfo/*, this.inputUserid.nativeElement.value*/);
     }
    }
    catch (error) {
      console.log(error);
    }
  }

}
