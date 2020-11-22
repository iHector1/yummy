import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecetaService } from '../service/receta.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';
import { AuthService } from "../../auth/services/auth.service";
@Component({
  selector: 'app-vista-receta',
  templateUrl: './vista-receta.component.html',
  styleUrls: ['./vista-receta.component.css']
})
export class VistaRecetaComponent implements OnInit {
  @ViewChild('receta') receta: ElementRef;
  points: number = 0;//puntos de la reseta 
  typeKitchen: string;
  cookud = new Array();//uid del utensilio
  uidunit = new Array();//uid de la unidad 
  ingredienuid = new Array();//uid del ingrediente
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
  infoRecipe: Observable<any>;
  other: any;
  repeat: any;
  unit: any;
  dificult: any;
  season: any;
  useruid: any;
  displayName: any;
  region: any;
  photoStep: any;
  cantOne= new Array();
  cantLength: number;

  constructor(private firestore:AngularFirestore, private storage: AngularFireStorage, private RecipeService:RecetaService,private router:Router,private auth:AuthService) { 


  }

  ngOnInit(): void {
    console.log(this.router.url.slice(8));
    this.RecipeService.retrieveUserDocumentFromRecipe(this.router.url.slice(8)).subscribe(recipe => {
      if (recipe[0]) {
        const recipeVar: any = recipe[0];
        this.other = recipe[0];
        this.urlImage = recipeVar.principalPhoto;
        this.typeKitchen = recipeVar.kitchenArea;
        this.portions = recipeVar.portions;
        this.urlImage = recipeVar.principalPhoto;
        this.cookud = recipeVar.uidsCookWare;
        this.title = recipeVar.title;
        this.cookTime = recipeVar.cookTime;
        this.ingredienuid = recipeVar.uidsIngredients;
        this.cant = recipeVar.count;
        this.unit = recipeVar.uidUnit;
      
        this.dificult = recipeVar.difficult ? recipeVar.difficult : "No hay dificultad";
        this.season = recipeVar.uidSeason;
        this.useruid = recipeVar.uidUser;
        this.user(this.useruid);
        this.region = recipeVar.uidRegion;
        this.step = recipeVar.steps;
        this.photoStep = recipeVar.stepsPhoto;
        console.log(this.cant.length);
        this.oneIngredient(this.portions);
     }
    });
  
    
  }
  add() {
      this.portions=this.portions+1;
      this.anyCant(this.portions);
  }
  substrac() {
    if (this.portions>1) {
      this.portions=this.portions-1; 
    }
    this.anyCant(this.portions);
  }
  oneIngredient(portions) {
    console.log("hola");
    for (let i = 0; i < this.cant.length;i++){
      this.cantOne[i] = this.cant[i] / portions;
     
    }

  }

  anyCant(portions) {
    for (let i = 0; i < this.cant.length;i++){
      this.cant[i] = this.cantOne[i] * portions;
      
    }
  }
  user(uid) {
    this.auth.getUser(uid).subscribe(user => {
      if (user[0]) {
        const uiUser:any = user[0];
        this.displayName = uiUser.displayName;
      }
      
    })
  }
  dowlandPDF() {
    const content: Element = document.getElementById('receta');
   const option = {
      filename:this.title+".pdf",
      image: { type: 'png'},
      html2canvas: {},
      jsPDF: {format:"a3", orientation: 'portrait' }
    };
    
    html2pdf().from(content).set(option).save();
    /*
    let doc = new jsPDF();
    doc.addHTML(content, () => {
      doc.autoPrint();
      doc.save('Test.pdf');
    });*/
    
  }
}