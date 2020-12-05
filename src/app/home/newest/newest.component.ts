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
  number: number = 2;
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit(): void {
    this.newest = this.afs.collection("infoRecipe", ref => ref.orderBy("timeStamp", "asc").limit(this.number)).valueChanges();
    this.slides = this.chunk(this.newest, 3);
  }

}
