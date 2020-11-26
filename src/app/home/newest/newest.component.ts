import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-newest',
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.css']
})
export class NewestComponent implements OnInit {
  newest: any;

  constructor(private afs:AngularFirestore) { }
  number: number = 1;
  ngOnInit(): void {
    this.newest=this.afs.collection("recipe",ref=>ref.orderBy("timestamp","asc").limit(this.number))
  }

}
