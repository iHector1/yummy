import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user.inteface';
import { ChatService } from '../service/chat.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chat-area',
  templateUrl: './chat-area.component.html',
  styleUrls: ['./chat-area.component.css']
})
export class ChatAreaComponent implements OnInit {
  subs: Subscription;
  paramValue: string;
  roomName: string;
  uidUser: string;
  userName: string;
  @Input() randomSeed: string;
  hidden: boolean;
  photo: any;
  uidUser2: any;
  
  constructor(private chatService:ChatService,private route:ActivatedRoute,private afs: AngularFirestore,private authService:AuthService) { }
public user$: Observable<User> = this.authService.afAuth.user;
  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.authService.getUser(user.uid).subscribe(name => {
        if (name[0]) {
          const person:any = name[0];
          this.uidUser = person.uid;
          this.userName = person.displayName;
        }
      }

      );

    });
    this.subs = this.chatService.pathParam.subscribe(value => {
      this.paramValue = value;
      //console.log(this.paramValue);
      this.afs.collection("rooms", ref => ref.where("id", '==', this.paramValue)).valueChanges().subscribe(room => {
        if (room[0]) {
          const uidRoom:any = room[0];
          if (uidRoom.users[0]==this.uidUser) {
            this.uidUser2 = uidRoom.users[1];
          } else {
            this.uidUser2 = uidRoom.users[0];
          }
          this.authService.getUser(this.uidUser2).subscribe(name => {
            if (name[0]) {
              const person:any = name[0];
              this.photo = person.photoUrl;
              this.roomName = person.displayName;
            }
          }
          );
        }
      })
    });
    
  }
  formSubmit(form: NgForm): void {
   // console.log("");
    if (form.invalid) {
      return; 
    }
    const {message} = form.value;
    form.resetForm();

    this.afs.collection('rooms').doc(this.paramValue).collection('messages').add({
     message:message,
      uidUser: this.uidUser,
     nameDisplay: this.userName,
      time: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
  chatData(ev: any) :void {
    if (ev.chatData !== undefined) {
      ev.chatData.subscribe(roomName => this.roomName = roomName);
    }
  }

}
