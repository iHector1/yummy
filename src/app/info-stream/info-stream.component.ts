import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-info-stream',
  templateUrl: './info-stream.component.html',
  styleUrls: ['./info-stream.component.css']
})
export class InfoStreamComponent implements OnInit {
  cookud: any;
  ingredienuid: any;
  cant: any;
  unit: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private afs:AngularFirestore) {
   // console.log(this.data);
    this.afs.collection('stream', ref => ref.where('uid', '==', this.data)).valueChanges().subscribe(stream => {
      if (stream[0]) {
        const streamVar: any = stream[0];
        this.cookud = streamVar.uidCookWare;
        this.ingredienuid = streamVar.uidIngredient;
        this.cant = streamVar.cant;
        this.unit = streamVar.uidUnit;
      }
    });
   }

  ngOnInit(): void {
  }

}
