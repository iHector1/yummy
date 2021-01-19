import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { comments } from 'src/app/shared/models/comments.interface';
import { infoRecipe } from 'src/app/shared/models/infoRecipe.interface';
import { ComentsService } from '../../service/coments.service';
import { RecetaService } from '../../service/receta.service';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-coment',
  templateUrl: './coment.component.html',
  styleUrls: ['./coment.component.css']
})
export class ComentComponent implements OnInit {
  words = [
    "pendejo","pendeja","zorra","joto","golfa","Caraponny","prostipirugolfa","caca","pene","pito","pinche","puto","verga","estupido","estupida","sonso","tonto","tonta","menso","mensa","meco","meca","hdsptm"];
  dificultys: Observable<any[]>;// Variable para recibir la dificultad de la receta

  //variables del formulario
  comentForm = new FormGroup({
    coment: new FormControl('',[Validators.minLength(3)]),
    difficult: new FormControl(''),
    stars: new FormControl('',[Validators.minLength(1),Validators.required])
  });
  uidUser: string;
  displayName: string;
  requests: number;
  difficult: number;
  stars: number;
  show: boolean;
  userRecipe: any;

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage, private authService: AuthService, private router: Router, private comments: ComentsService, private recipe: RecetaService) {
    this.dificultys = firestore.collection('dificulty').valueChanges();
    firestore.collection('infoRecipe', ref => ref.where("uid", "==", this.router.url.slice(8))).valueChanges().subscribe(
      recipe => {
        if (recipe[0]) {
          const recipes: any = recipe[0];
          this.requests = recipes.requests ? recipes.requests : 0;
          this.difficult = recipes.difficult ? recipes.difficult : 0;
          this.stars = recipes.stars ? recipes.stars : 0;
          this.userRecipe = recipes.uidUser;
          this.user$.subscribe(user => {
            this.authService.getUser(user.uid).subscribe(userInfo => {
              if (userInfo[0]) {
                const info: any = userInfo[0];
                this.uidUser = info.uid;
                this.displayName = info.displayName;
             //   console.log(this.displayName);
            if (this.uidUser == recipes.uidUser || this.uidUser == undefined || this.uidUser == "") {
              this.show = false;
            }
            else {
              this.show = true;
              this.checkComment(this.uidUser);
            }
              
              
              }
            
            }
            );
          });
          
        }

      }
    )

  }
  checkComment(uidUser: string) {
     this.firestore.collection('comment', ref => ref.where('uidRecipe', '==', this.router.url.slice(8)).where('uidUser', '==', uidUser)).valueChanges().subscribe(comment => {
      if (comment[0]) {
        this.show = false;
        // console.log(comment[0]);
        // console.log(this.show)
      }
    });
  }

  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void {

  }

  insert_coment() {
    const { coment, difficult, stars } = this.comentForm.value;
    if (!this.comentForm.controls.coment.errors&&difficult!=""&&!this.comentForm.controls.stars.errors&&coment!=" ") {
       const uidRecipe = this.router.url.slice(8)
    console.log(coment, difficult, stars, uidRecipe);
    var commentd = coment;
    for (var i = 0; i < this.words.length; i++) {
      if (commentd.indexOf(this.words[i].toLowerCase()) !== -1) {
        commentd = commentd.replace(
          this.words[i].toLowerCase(),
          this.pushAsterisksForWordLength(this.words[i].length)
        );
      }
    }
    const id = Math.random().toString(36).substring(2);
    const comment: comments = {
      uid:id,
      comment: commentd,
      difficult: difficult,
      stars: stars,
      uidRecipe: uidRecipe,
      uidUser: this.uidUser,
      displayName: this.displayName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      userRecipe:this.userRecipe
    };
   // console.log(this.stars," ",stars);
    this.difficult = this.difficult * this.requests;
    this.stars = this.stars * this.requests;
    this.requests = this.requests + 1;
    this.difficult = (this.difficult + difficult) / this.requests;
    this.stars = (this.stars + Number(stars)) / this.requests;
    this.stars = Math.round(this.stars);
    console.log(this.stars);
     this.comments.insert_coment(comment);
    this.recipe.updateRecipe(this.requests, this.stars, this.difficult, this.router.url.slice(8));
    this.show = false;
    window.alert("haz hecho un comentario");
    }else{
      window.alert('Completa todos los campos');
    }
   
  }
  pushAsterisksForWordLength(asterisksLength) {
    var censoredWordArray = [];
    for (var i = 0; i < asterisksLength; i++) {
      censoredWordArray.push("*");
    }
    return censoredWordArray.join("");
  }
}
