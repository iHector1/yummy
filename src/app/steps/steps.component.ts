import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../shared/models/user.inteface';
import { StepsService } from './service/steps.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  steps = new Array();
  stepImage = new Array();
  Technique= new Array();
  points: any;
  imagePosition: any;
  stepPositions: any;
  index:any=0;
  lenghtSteps: number;
  uidUser: string=null;
  videourl: any;
  videosurl: any;
  videoPosition: any;
  constructor(private router: Router, private afs: AngularFirestore,private auth:AuthService,private stepsService:StepsService) {
    const id = this.router.url.slice(7);
   // console.log(id);
    this.afs.collection('infoRecipe', ref => ref.where('uid', '==', id)).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        const infoRecipe: any = recipe[0];
        this.stepImage = infoRecipe.stepsPhoto;
        this.steps = infoRecipe.steps;
        this.Technique = infoRecipe.uidsTechnique;
        this.points = infoRecipe.points;
        this.lenghtSteps = this.steps.length;
        this.imagePosition = this.stepImage[0];
        this.videosurl = infoRecipe.video ? infoRecipe.video:["","","","","","","","","","","","","","","","","","",""];
        this.videoPosition = this.videosurl[0];
        this.stepPositions = this.steps[0];
        this.videourl = infoRecipe.urlVideo;
        console.log(this.videourl);
        this.videourl = this.videourl.slice(32);
        console.log(this.videourl);
     //   console.log(this.imagePosition, this.steps);
      //  console.log(this.Technique);
      }
    });
    this.user$.subscribe(user => {
      this.uidUser = user.uid;
    //  console.log(this.uidUser);
    })
   }
  user$: Observable<User> = this.auth.afAuth.user;
  ngOnInit(): void {
   
    
  }

  advange() { 
    this.index = this.index + 1;
    if (this.index == this.lenghtSteps) {
    
      if (this.uidUser!=null) {
        window.alert(`Fin de la receta, has gando: ${this.points} puntos`);
        this.pointsUser();
      } else {
        window.alert('Fin de la receta!')
      }
      
      this.router.navigate(['/home']);
    } else {
      this.imagePosition = this.stepImage[this.index];
      this.stepPositions = this.steps[this.index];
      this.videoPosition = this.videosurl[this.index];
      
    }
  }
  substrac() {
    
    if (this.index > 0) {
      this.index = this.index - 1;
      this.imagePosition = this.stepImage[this.index];
      this.stepPositions = this.steps[this.index];
      this.videoPosition = this.videosurl[this.index];
      
    } 
  }
  private pointsUser() {
    this.stepsService.pointsUser(this.uidUser, this.points);
  }

}
