
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {DateAdapter} from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor(public dialog: MatDialog, private router: Router, private afs: AngularFirestore,private _adapter: DateAdapter<any>) {
    console.log(this.router.url.slice(8));
    this.foodTime = this.afs.collection('foodTime').valueChanges();
    this._adapter.setLocale('mex');
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
      console.log(date,time); 
    }
   
    
  } 
}
