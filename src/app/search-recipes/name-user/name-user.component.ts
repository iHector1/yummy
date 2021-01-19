import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { infoUser } from 'src/app/shared/models/infoUser.interface';

@Component({
  selector: 'app-name-user',
  templateUrl: './name-user.component.html',
  styleUrls: ['./name-user.component.css']
})
export class NameUserComponent implements OnInit {

  @Input() uid: any;
  name:any
  constructor(private afs:AngularFirestore) { }

  ngOnInit(): void {
    this.afs.collection('infoUser', ref => ref.where('uid', '==', this.uid)).valueChanges().subscribe(user => {
      if (user[0]) {
        const infoUser: infoUser = user[0];
        this.name = infoUser.displayName;
        //console.log(this.name);
      }
    })
  } 
}
