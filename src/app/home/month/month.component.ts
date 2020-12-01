import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HomeService } from '../Service/home.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  //const f = new Date();
  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private homeService:HomeService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
}
