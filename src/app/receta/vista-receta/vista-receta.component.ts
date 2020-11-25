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
import { User } from 'src/app/shared/models/user.inteface';
import { FollowService } from 'src/app/auth/services/follow.service';

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
  technique = new Array();//array de las tecnicas
  urlImage: string;//url de la foto de la receta
  urlVideo: any;//url del video de youtube 
  portions: any;//variable de las porciones 
  title: any;//titulo de la receta
  cookTime: any;//tiempo de la receta 
  recipe: any;//varibale de receta
  infoRecipe: Observable<any>;//observable de la informacion de la receta 
  other: any;//guradar la informcacion de la receta 
  unit: any;//unidad de la receta 
  dificult: any;//dificultad de la receta 
  season: any;//variable de la temporada de la receta 
  useruid: any;//uid del usuario creador de la receta 
  displayName: any;//nombre de usuario creador 
  region: any;//region de la receta 
  photoStep: any;//foto de los pasos de la receta 
  cantOne= new Array();//cantidad de la receta para una porcion 
  url: any;//url de la receta 
  isLogget: boolean;//verificacion de usuario registrado
  isUser: string;//nombre del usuario registrado 
  show: boolean;//varibrle para mostrar el boton de seguir 
  colorButton: string="accent";//color del boton 
  isFollowing:boolean;//verificar que lo sigue 
  constructor(private firestore:AngularFirestore, private storage: AngularFireStorage, private RecipeService:RecetaService,private router:Router,private auth:AuthService,private follow: FollowService) { 
  }
  public user$: Observable<User> = this.auth.afAuth.user;
  ngOnInit(): void {
    this.isFollowing = false;
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
    this.url =  'https://github.com/MurhafSousli/ngx-sharebuttons/issues/262';
  
    
  }
  //agregar una porcion 
  add() {
      this.portions=this.portions+1;
      this.anyCant(this.portions);
  }
  //disminuir una porcion
  substrac() {
    if (this.portions>1) {
      this.portions=this.portions-1; 
    }
    this.anyCant(this.portions);
  }

  //funcion una porcion 
  oneIngredient(portions:any) {
    for (let i = 0; i < this.cant.length;i++){
      this.cantOne[i] = this.cant[i] / portions;
     
    }

  }
//insertar las porciones en la varible 
  anyCant(portions:any) {
    for (let i = 0; i < this.cant.length;i++){
      this.cant[i] = this.cantOne[i] * portions;
      
    }
  }
  //checar usuario 
  user(uid) {
    this.auth.getUser(uid).subscribe(user => {
      if (user[0]) {
        const uiUser:any = user[0];
        this.displayName = uiUser.displayName;
        this.user$.subscribe(user => {
          this.isUser = user.uid;
          if (this.isUser == uiUser.uid ||this.isUser==null||this.isUser==undefined||this.isUser=="") {
            this.show = false; 
           
        }
        else {
            this.show = true;
            this.follow.isFollowing(uid, this.isUser).subscribe(
              followinguser => {
                if (followinguser[0]) {
                  this.isFollowing = true;
                  console.log("sie entro ");
                }
            });
        }
        console.log("primero: ",uiUser.uid,"segundo: ",this.isUser);
        console.log(this.show);
        });
        
      }
      
    })
  }
  

  followUser() {
    if (this.isFollowing) {
      this.isFollowing = false;
      this.follow.unfollow(this.useruid);
    } else {
      this.isFollowing = true;
      this.follow.follow(this.useruid);
    }
  }

  checkFollowing() {
    if (this.isFollowing) {
      this.colorButton = "primary";
      return 'Siguiendo';
    } else {
      this.colorButton = "accent";
      return 'Seguir';
    }
  }

  //descargar la receta en pdf
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