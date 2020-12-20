import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
  uidIngredients: Observable<any[]>;// Variable para recibir los ingredientes
  uidUnit: Observable<any[]>;//Variable para recibir las unidades de medida de los ingredientes
  uidCookWare: Observable<any[]>;// Variable para recibir los utensilios
  uidCategory: Observable<any[]>;// Variable para recibir la categoría
  uidCollection: Observable<any[]>;// Variable para recibir la colección
  uidSeason: Observable<any[]>;// Variable para recibir la temporada
  uidsTechnique: Observable<any[]>;
  uidRegion: Observable<any[]>;// Variable para recibir la region
  //variables del formulario
  recipeForm = new FormGroup({
    title: new FormControl(''),
    cookTime: new FormControl(''),
    uidsIngredients: new FormControl(''),
    uidsUnit: new FormControl(''),
    uidsCookWare: new FormControl(''),
    uidsCategory: new FormControl(''),
    uidsCollection: new FormControl(''),
    uidsRegion: new FormControl(''),
    uidsSeason: new FormControl(''),
    uidsTechnique: new FormControl(''),
    portions: new FormControl(''),
    portionsCalories: new FormControl(''),
    videoUrl: new FormControl(''),
    booelanPremium:new FormControl(''),
  });
  urlImage2: Observable<any>;
  kitchenBar: number = 0;//variable del contador bar
  kitchenPas: number = 0;//variable del contador pasteleria
  kitchenfria: number = 0;//variable del contador fria
  kitchenhot: number = 0;//variable del contador caliente
  kitchenAreaa: string;//variable de la area de cocina 
  points: number = 0;//puntos de la reseta 
  typeCook: number = 0;
  common: number = 0;//varible del contador comun
  typeKitchen: number = 0;
  advanced: number = 0;//varible del avanzado
  measureco: number = 0;//varible del medida
  cook = new Array();//nombre
  cookud = new Array();//uid del utensilio
  uidunit = new Array();//uid de la unidad 
  unit = new Array();//nombre de la aunidad 
  unit2 = new Array();//nombre de la aunidad 
  ingredienuid = new Array();//uid del ingrediente
  ingredient = new Array();//nombre del ingrediente
  cant = new Array();//cantidad 
  step = new Array();//paso
  imageStep = new Array();//array de imagenes
  description: string = "";
  technique = new Array();
  uidtechnique = new Array();
  @ViewChild('stepp') inputstep: ElementRef;
  @ViewChild('image') stepImage: ElementRef;
  @ViewChild('idUser') inputUserid: ElementRef;
  @ViewChild('image2') imageRecipe: ElementRef;
  @ViewChild('cantt') inputCant: ElementRef;
  uploadPercent: Observable<number>;
  uploadPercent2: Observable<number>;
  urlImage: Observable<any>;
  creatorPremium: boolean = true;
  public user$: Observable<User> = this.authService.afAuth.user;
  constructor(private firestore:AngularFirestore, private storage: AngularFireStorage, private RecipeService:RecetaService,private authService:AuthService,private router:Router) {
    this.uidUnit = this.firestore.collection('unit').valueChanges();
    this.uidCookWare = this.firestore.collection('cookWare',ref=>ref.where("requests",">=",3)).valueChanges();
    this.uidCategory = this.firestore.collection('category').valueChanges();
    this.uidCollection = this.firestore.collection('collection').valueChanges();
    this.uidSeason = this.firestore.collection('season').valueChanges();
    this.uidIngredients = this.firestore.collection('ingredients',ref=>ref.where("requests",">=",3)).valueChanges();
    this.uidRegion = this.firestore.collection('region').valueChanges();
    this.uidsTechnique = this.firestore.collection('techniques').valueChanges();

  }

  ngOnInit(): void {
      this.user$.subscribe(user => {
      console.log(user.uid);
      this.firestore.collection('premiunCreator', ref => ref.where('uidUser', '==', user.uid)).valueChanges().subscribe(
        premium => {
          if (premium[0]) {
            this.creatorPremium = false;
          } else {
            this.creatorPremium = true;
          }
          console.log(this.creatorPremium);
        }
      )
      })
  }

  async create_recipe() {
    try {
      let { title, cookTime, portions, portionsCalories, uidsCategory, uidsSeason, uidsCollection, uidsRegion, booelanPremium } = this.recipeForm.value;
      if (this.creatorPremium==true) {
        booelanPremium = false;
      }
      let hours = 0;
      if (title == " "||title == "  "||title == "   "||title == "    "||title == "     "||title =="") {
        window.alert("Por favor que no esten vacíos ");
      } 
      else if (portions == ""||portionsCalories == ""||cookTime =="") {
        window.alert("Por favor que no esten vacíos.");
      }
      else if (uidsCategory == ""||uidsSeason == ""||uidsCollection == ""||uidsRegion == "") {
        window.alert("Por favor que no esten vacíos.");
      }
      else if (this.step.length<=0) {
        window.alert("Por favor ingrese los pasos ");
      }else if (this.cookud.length<=0) {
        window.alert("Por favor ingresa los utencilios ");
      }
      else if (this.uidtechnique.length<=0) {
        window.alert("Por favor ingresa las tecnicas ");
      }
      else if (this.imageRecipe.nativeElement.value=="") {
        window.alert("Por favor ingresa una foto Principal ");
      }
      else {
        const id = Math.random().toString(36).substring(2);
        if (cookTime>=60) {
          hours = 10;
        } else if (cookTime=>120) { 
          hours = 20;
         } else if (cookTime>180) {
          hours = 30;  
        }
        this.points = this.typeCook + this.typeKitchen+hours;
        const recipeInfo: infoRecipe = {
          uid: id,
          title: title,
          uidCategory: uidsCategory,
          cookTime: cookTime,
          uidRegion:uidsRegion,
          portions: portions,
          uidUnit: this.unit2,
          points: this.points,
          portionCalories:portionsCalories,
          uidCollection: uidsCollection,
          uidSeason: uidsSeason,
          uidsIngredients:this.ingredienuid,
          uidsCookWare: this.cookud, 
          steps: this.step,
          count:this.cant,
          principalPhoto:this.imageRecipe.nativeElement.value,
          stepsPhoto: this.imageStep,
          uidsTechnique:this.uidtechnique,
          uidUser: this.inputUserid.nativeElement.value,
          timeStamp: new Date(),
          urlVideo: this.recipeForm.controls.videoUrl.value,
          kitchenArea: this.kitchenAreaa,
          recipePremium:booelanPremium,
        };
        console.log(recipeInfo);
        this.RecipeService.RecipeDataAdd(recipeInfo);
        this.RecipeService.RecipeDataAddRecipe(recipeInfo);
        this.router.navigate(['/home']);
     }
      console.log(booelanPremium);
    }
    catch (error) {
      console.log(error);
    }
  }

  addIngredient() {
    if (this.recipeForm.controls.uidsUnit.value != " " &&this.recipeForm.controls.uidsIngredients.value != " " && this.inputCant.nativeElement.value != "") { 
      this.ingredient.push(this.recipeForm.controls.uidsIngredients.value["nameIngredient"]);
      this.ingredienuid.push(this.recipeForm.controls.uidsIngredients.value["nameIngredient"]);
      this.unit.push(this.recipeForm.controls.uidsUnit.value["unitName"]);
      this.unit2.push(this.recipeForm.controls.uidsUnit.value["unitName"]);
      this.cant.push(this.uidunit.push = this.inputCant.nativeElement.value);
    }
    else {
      window.alert('ingrese todos los datos por favor');
    }
  }
  addStep() {
    if (this.inputstep.nativeElement.value != "") { 
      this.step.push(this.inputstep.nativeElement.value);
      this.imageStep.push(this.stepImage.nativeElement.value);
      this.inputstep.nativeElement.value = "";
      this.stepImage.nativeElement.value = "";
    } else {
      window.alert("Espacio vacio en pasos");
    }

  }
  descriptioon() {
    this.description = this.recipeForm.controls.uidsTechnique.value["description"];
   // console.log("description");
  }
  addTechnique() {
    if (this.recipeForm.controls.uidsTechnique.value!=" " ) {
      this.technique.push(this.recipeForm.controls.uidsTechnique.value["nameTechnique"]);
      this.uidtechnique.push(this.recipeForm.controls.uidsTechnique.value["uid"]);
      if (this.recipeForm.controls.uidsTechnique.value["kitchenArea"]=="8imxlPcifjHThZ3K9A6w") {
        this.kitchenBar = 1+this.kitchenBar;
      } else if (this.recipeForm.controls.uidsTechnique.value["kitchenArea"]=="wASjnlc1WKaHEHG4mfBX") {
        this.kitchenfria = 1+this.kitchenfria;
      } else if (this.recipeForm.controls.uidsTechnique.value["kitchenArea"]=="dphpului3HWc8ckagmI8") {
        this.kitchenPas = 1+this.kitchenPas;
      } else if (this.recipeForm.controls.uidsTechnique.value["kitchenArea"]=="EWQBJXyXP7EEHG233UTV") {
        this.kitchenhot = 1+this.kitchenhot;
        
      }
      if (this.kitchenhot>=this.kitchenfria && this.kitchenhot>=this.kitchenBar && this.kitchenhot>=this.kitchenPas) { 
        this.kitchenAreaa = "Cocina Caliente";
        this.typeKitchen = 40;
      } else if (this.kitchenfria>this.kitchenhot && this.kitchenfria>=this.kitchenBar && this.kitchenfria>=this.kitchenPas) {
        this.kitchenAreaa = "Cocina Fira";
        this.typeKitchen = 30;
      } else if (this.kitchenPas>this.kitchenhot && this.kitchenPas>this.kitchenfria && this.kitchenPas>=this.kitchenBar) {
        this.kitchenAreaa = "Pasteleria o reposteria ";
        this.typeKitchen = 20;
      } else if (this.kitchenBar>this.kitchenhot && this.kitchenBar>this.kitchenfria && this.kitchenBar>this.kitchenPas) {
        this.kitchenAreaa = "Bar";
        this.typeKitchen = 10;
       }
      //console.log("area de la cocina ",this.kitchenAreaa,"hot : ",this.kitchenhot," cold: ",this.kitchenfria," pasteleria: ",this.kitchenPas, " bar ",this.kitchenBar);
    }
    else{
      window.alert("La casilla del utensilio esta vacia, porfavor intenta de nuevo");
    }

  }
  onUpload(e) {
    console.log(e);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `Imagephoto/profile_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).subscribe();
  }
  addCookWare() {
    if (this.recipeForm.controls.uidsCookWare.value!=" " ) {
      this.cook.push(this.recipeForm.controls.uidsCookWare.value["nameCookWare"]);
      this.cookud.push(this.recipeForm.controls.uidsCookWare.value["nameCookWare"]);

      if (this.recipeForm.controls.uidsCookWare.value["uidLevelCookWare"] =="1PYRywhGLbT2tgwcXSun") {
        this.measureco = 1 + this.measureco;
      } else if (this.recipeForm.controls.uidsCookWare.value["uidLevelCookWare"] =="p4zKEa5MP50BHfjrNb8u") {
        this.common = this.common + 1;
      } else if (this.recipeForm.controls.uidsCookWare.value["uidLevelCookWare"] =="dxqr4n3qm3rlVxFNCm73") {
        this.advanced = this.advanced + 1;
      }

      if (this.common>1 || this.measureco>1) {
        this.typeCook = 10;
      } else if (this.advanced>1) {
        this.typeCook = 40;
      }
      console.log("comun ",this.common," medida", this.measureco, " avanzado",this.advanced,"puntaje",this.typeCook);
    }
    else{
      window.alert("La casilla del utensilio esta vacia, porfavor intenta de nuevo");
    }
  }
  onUpload2(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `Imagephoto/photo_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent2 = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage2 = ref.getDownloadURL())).subscribe();
  }
  /*formatDate(): Date {
    let date=new Date();
    const year = date.getFullYear();
    const mouth = date.getMonth();
    const day = date.getDate();
    return `${day}-${mouth}-${year}`;
  }*/
}
