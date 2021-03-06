import * as jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecetaService } from '../service/receta.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';
import { AuthService } from "../../auth/services/auth.service";
import { User } from 'src/app/shared/models/user.inteface';
import { FollowService } from 'src/app/auth/services/follow.service';
import { ChatService } from 'src/app/chat/service/chat.service';
import { RecipeSavedComponent } from 'src/app/recipe-saved/recipe-saved.component';
import { RecipeSavedService } from 'src/app/recipe-saved/service/recipe-saved.service';
import { PlanRecipeComponent } from '../../plan-recipe/plan-recipe.component';
import { MatDialog } from '@angular/material/dialog';
import { OptionRecipeComponent } from 'src/app/option-recipe/option-recipe.component';

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
  cantOne = new Array();//cantidad de la receta para una porcion 
  url: any;//url de la receta 
  isLogget: boolean;//verificacion de usuario registrado
  isUser: string;//nombre del usuario registrado 
  show: boolean;//varibrle para mostrar el boton de seguir 
  colorButton: string = "accent";//color del boton 
  isFollowing: boolean;//verificar que lo sigue 
  isUserName: any;
  videoY: any;
  colorSave: string;
  textSave: string;
  isSave: boolean;
  category: any;
  starCount = new Array();
  premiumRecipe: boolean;
  uidRecipe: any;
  isUser2: any;
  showOption: boolean = false;
  userN: boolean;
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private RecipeService: RecetaService, private router: Router, private auth: AuthService, private follow: FollowService, private chat: ChatService, private saveService: RecipeSavedService, private dialog: MatDialog, private route: ActivatedRoute) {
  }
  public user$: Observable<User> = this.auth.afAuth.user;
  ngOnInit(): void {
    this.uidRecipe = this.route.snapshot.paramMap.get('id');
    console.log(this.uidRecipe);
    this.isFollowing = false;
    this.RecipeService.retrieveUserDocumentFromRecipe(this.uidRecipe).subscribe(recipe => {
      if (recipe[0]) {
        const recipeVar: any = recipe[0];
        this.other = recipe[0];
        this.urlImage = recipeVar.principalPhoto;
        this.typeKitchen = recipeVar.kitchenArea;
        this.portions = recipeVar.portions;
        this.urlImage = recipeVar.principalPhoto;
        console.log(this.urlImage);
        this.cookud = recipeVar.uidsCookWare;
        this.title = recipeVar.title;
        this.cookTime = recipeVar.cookTime;
        this.ingredienuid = recipeVar.uidsIngredients;
        this.category = recipeVar.uidCategory;
        this.cant = recipeVar.count;
        this.unit = recipeVar.uidUnit;
        this.videoY = recipeVar.urlVideo;
        this.dificult = recipeVar.difficult ? recipeVar.difficult : "No hay dificultad";
        this.premiumRecipe = recipeVar.recipePremium;
        if (recipeVar.requests >= 5) {
          this.levelDificult(recipeVar.difficult);
          this.starsCheck(recipeVar.stars)
        } else {
          this.dificult = "No hay dificultad";
        }
        this.season = recipeVar.uidSeason;
        this.useruid = recipeVar.uidUser;
        this.user(this.useruid, this.premiumRecipe);
        this.region = recipeVar.uidRegion;
        this.step = recipeVar.steps;
        this.photoStep = recipeVar.stepsPhoto;
        // console.log(this.cant.length);
        this.saveCheck();
        this.oneIngredient(this.portions);
      } else {
        this.router.navigate(['/no_existe']);
      }
    });
    this.url = "https://yummy-b4d83.web.app" + this.router.url;
    console.log(this.url);

  }

  //agregar difigultad
  levelDificult(dificult) {

    if (dificult >= 1 && dificult <= 1.4) {
      this.dificult = "Muy Facil";
    }
    if (dificult > 1.4 && dificult <= 2.5) {
      this.dificult = "Facil";
    }
    if (dificult > 2.5 && dificult <= 3.4) {
      this.dificult = "Medio";
    }
    if (dificult > 3.4 && dificult <= 4) {
      this.dificult = "Muy Facil";
    }

  }
  //agregar una porcion 
  add() {
    this.portions = this.portions + 1;
    this.anyCant(this.portions);
  }
  //disminuir una porcion
  substrac() {
    if (this.portions > 1) {
      this.portions = this.portions - 1;
    }
    this.anyCant(this.portions);
  }

  //funcion una porcion 
  oneIngredient(portions: any) {
    for (let i = 0; i < this.cant.length; i++) {
      this.cantOne[i] = this.cant[i] / portions;

    }

  }
  //insertar las porciones en la varible 
  anyCant(portions: any) {
    for (let i = 0; i < this.cant.length; i++) {
      var number;
      number = (this.cantOne[i] * portions);
      this.cant[i] = number.toFixed(2);
    }
  }
  //checar usuario 
  user(uid, premium) {
    console.log("si entro awevo que si 1"); 
    this.auth.getUser(uid).subscribe(user => {
      console.log("si entro awevo que si 2");
      if (user[0]) {
        console.log("si entro awevo que si 3");
        const uiUser: any = user[0];
        this.displayName = uiUser.displayName;
        this.isUser2 = uiUser.uid;
        this.user$.subscribe(user => {
          try {
            this.isUser = user.uid;
          } catch (err) {
            console.log(err);
            this.showOption = false;
          }
          this.userN = false;
          if (!this.isUser && this.premiumRecipe == true) {
            this.router.navigate([`/ver_premium/${uiUser.uid}`]);
          } console.log("si entro awevo que si 4");
          if (this.isUser == uiUser.uid || this.isUser == null || this.isUser == undefined || this.isUser == "") {
            this.show = false;
            if (this.isUser == uiUser.uid) {
              this.showOption = true;
            }
            this.userN = true;
            //console.log(this.isUser);
          }
          else {
            this.showOption = true;
            this.show = true;
            this.userN = true;
            this.follow.isFollowing(uid, this.isUser).subscribe(
              followinguser => {
                if (followinguser[0]) {
                  this.isFollowing = true;
                  const follow: any = followinguser[0];
                  console.log(premium);
                  this.userN = true
                  if (premium == true) {
                    this.checkUserPremium(follow);
                  }
                  //  console.log(follow);
                } else {
                  if (premium == true) {
                    this.router.navigate([`/ver_premium/${uiUser.uid}`]);
                  }
                }
              });

          }
          this.auth.getUser(this.isUser).subscribe(user2 => {
            if (user2[0]) {
              const uiUser2: any = user2[0];
              this.isUserName = uiUser2.displayName;
            }
          })
          console.log("primero: ", uiUser.uid, "segundo: ", this.isUser);
          // console.log(this.show);
        });


      }

    })
  }
  checkUserPremium(follow: any) {
    //(follow.userPremium);
    console.log(this.userN);
    if (follow.userPremium == false || this.userN == false) {
      console.log("si entro pero no funciono");
      this.router.navigate([`/ver_premium/${follow.uidFollower}`]);
    } else {
      var fechaInicio = new Date(follow.datePremium.seconds*1000).getTime();
      var fechaFin = new Date().getTime();
      var diff = fechaFin - fechaInicio;

      if (diff / (1000 * 60 * 60 * 24) >= 30) {
        this.router.navigate([`/ver_premium/${follow.uidFollower}`]);
      }
    }
  }

  //checar que siguigue al usuario o no siguie al usuario
  followUser() {
    if (this.isFollowing) {
      this.isFollowing = false;
      this.follow.unfollow(this.useruid);
    } else {
      this.isFollowing = true;
      this.follow.follow(this.useruid);
      this.chat.createChat(this.useruid, this.isUser, this.displayName, this.isUserName)
    }
  }

  //vista del boton de dependiento si sigue al usuario o no sigue al usuario
  checkFollowing() {
    if (this.isFollowing) {
      this.colorButton = "primary";
      return 'Siguiendo';
    } else {
      this.colorButton = "accent";
      return 'Seguir';
    }
  }
  //conteo de estrellas
  starsCheck(stars) {

    if (stars >= 1 && stars <= 1.4) {
      this.starCount = [1];
    }
    if (stars > 1.4 && stars <= 2.5) {
      this.starCount = [1, 1];
    }
    if (stars > 2.5 && stars <= 3.4) {
      this.starCount = [1, 1, 1];
    }
    if (stars > 3.4 && stars <= 4) {
      this.starCount = [1, 1, 1, 1];
    }
    if (stars > 4) {
      this.starCount = [1, 1, 1, 1, 1];

    }
  }
  //verificacion de guardar receta
  saveCheck() {
    this.user$.subscribe(user => {
      this.isUser = user.uid;
      this.saveService.checkRecipe(this.router.url.slice(8), this.isUser).subscribe(recipe => {
        if (recipe[0]) {
          this.colorSave = 'accent';
          this.textSave = 'Guardado';
          this.isSave = true;
        } else {
          this.colorSave = 'primary';
          this.textSave = 'Guardar';
          this.isSave = false;

        }
      })
    })
  }
  //accion de guardar receta
  buttonSaveAction() {
    if (this.isSave == true) {
      this.deleteSave();
      this.isSave = false;
    } else {
      this.saveRecipe();
      this.isSave = true;
    }
  }
  //elimitar receta guardada
  deleteSave() {
    this.saveService.deleteRecipe(this.router.url.slice(8), this.isUser);
    window.alert('Receta no Guardada');
  }
  //agregar la receta y guardarla
  saveRecipe() {
    this.saveService.saveRecipe(this.router.url.slice(8), this.isUser, this.category);
    window.alert('Receta Guardada');
  }
  //descargar la receta en pdf
  dowlandPDF() {
    const content: Element = document.getElementById('receta');
    const option = {
      filename: this.title + ".pdf",
      image: { type: 'png' },
      html2canvas: {},
      jsPDF: { format: "a4", orientation: 'portrait' }
    };

    html2pdf().from(content).set(option).save();
    /*
    let doc = new jsPDF();
    doc.addHTML(content, () => {
      doc.autoPrint();
      doc.save('Test.pdf');
    });*/

  }
  openDialog() {
    const dialogRef = this.dialog.open(PlanRecipeComponent, { data: { uidUser: this.isUser } });
  }
  openOptions() {
    let equal: boolean;
    if (this.isUser == this.isUser2) {
      equal = true;
    } else {
      equal = false;
    }
    this.dialog.open(OptionRecipeComponent, { data: equal });
  }
}