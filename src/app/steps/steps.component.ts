import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

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
  constructor(private router: Router, private afs: AngularFirestore,private auth:AuthService) {
    const id = this.router.url.slice(7);
    console.log(id);
    this.afs.collection('infoRecipe', ref => ref.where('uid', '==', id)).valueChanges().subscribe(recipe => {
      if (recipe[0]) {
        const infoRecipe:any = recipe[0];
        this.stepImage = infoRecipe.stepsPhoto;
        this.steps = infoRecipe.steps;
        this.Technique = infoRecipe.uidsTechnique;
        this.points = infoRecipe.points;
        this.lenghtSteps = this.steps.length;
        this.imagePosition = this.stepImage[0];
        this.stepPositions = this.steps[0];
        console.log(this.imagePosition, this.steps);
        console.log(this.Technique);
      }
    })
   }

  ngOnInit(): void {
   
    
  }

  advange() { 
    this.index = this.index + 1;
    if (this.index==this.lenghtSteps) {
      window.alert(`Fin de la receta, has gando: ${this.points}`);
      this.router.navigate(['/home']);
    }
    this.imagePosition = this.stepImage[this.index];
    this.stepPositions = this.steps[this.index];
  }

}
