
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {DateAdapter} from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/services/auth.service';
import { plannedRecipe } from '../shared/models/plannedRecipe.interface';
import { PlanServiceService } from './service/plan-service.service';

@Component({
  selector: 'app-plan-recipe',
  templateUrl: './plan-recipe.component.html',
  styleUrls: ['./plan-recipe.component.css']
})
export class PlanRecipeComponent implements OnInit {
  minDate: Date = new Date();
  foodTime: Observable<any>;

  formPlan = new FormGroup({
    date: new FormControl(''),
    time:new FormControl('')
  });
  constructor(public dialog: MatDialog, private router: Router, private afs: AngularFirestore,private _adapter: DateAdapter<any>,@Inject(MAT_DIALOG_DATA) public data: plannedRecipe,private planService:PlanServiceService) {
   // 
    this.foodTime = this.afs.collection('foodTime').valueChanges();
    this._adapter.setLocale('mex');
    //console.log(data.uidUser);
   }

  ngOnInit(): void {
  }
  planRecipe() {
    const { time, date } = this.formPlan.value;
    if (date=="") {
     window.alert('Completa todos los campos');
      
    }else if (time == "") {
      window.alert('Completa todos los campos');
    } else {
      const id = Math.random().toString(36).substring(2);
      const plannedRecipe: plannedRecipe = {
        uid: id,
        uidRecipe: this.router.url.slice(8),
        uidUser: this.data.uidUser,
        time: time,
        date:date
      };
     this.planService.add(plannedRecipe);
    }
   
    
  } 
}
