import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { myCupboard } from 'src/app/shared/models/myCupboaed.interface';
import { CupboardServiceService } from '../service/cupboard-service.service';

@Component({
  selector: 'app-table-cupboard',
  templateUrl: './table-cupboard.component.html',
  styleUrls: ['./table-cupboard.component.css']
})
export class TableCupboardComponent implements OnInit {
  itemList: any;

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private cupboardService:CupboardServiceService,private authService:AuthService,private router:Router) {
    this.itemList = firestore.collection<myCupboard>("myCupboard",ref=>ref.where("uidUser","==",this.router.url.slice(12)))
    .valueChanges()
  }

  ngOnInit(): void {
  }

}
