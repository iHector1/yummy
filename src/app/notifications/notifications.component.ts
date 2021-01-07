import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  noti: any;
  constructor(private afs: AngularFirestore,private router:Router) {
    this.noti =this.afs.collection('mail', ref => ref.where('uidUser', '==', this.router.url.slice(16)).orderBy('delivery.startTime','desc')).valueChanges();
    this.noti.subscribe(notifi => {
    // console.log(notifi);
    })
   }

  ngOnInit(): void {
  }

}
