import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/models/user.inteface';
import { ChatService } from '../../service/chat.service';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit,OnDestroy {
  subs: Subscription[] = [];
  isUser:string;
  item;
  messageData: any[] = [];

  @Output() chatData: EventEmitter<any> = new EventEmitter<any>();
  uidUser: string;
  
  constructor(private chatService: ChatService, private route: ActivatedRoute, private afs: AngularFirestore,private authService:AuthService) { 
    this.user$.subscribe(user => {
      this.isUser = user.uid;
    });
  }

  public user$: Observable<User> = this.authService.afAuth.user;
  ngOnInit(): void {
    this.user$.subscribe(user => {
      this.uidUser = user.uid;
      
      this.subs.push(this.route.paramMap
        .pipe(
          map(paramMap => paramMap.get('uidRoom'))
        )
        .subscribe(routePathParam => this.chatService.updatePathParamState(routePathParam)));
        
    
      this.subs.push(
        this.route.params.subscribe(par => {
          
          if (par.uidRoom!=null||par.uidRoom!="") {
            this.afs.collection('rooms').doc(par.uidRoom).get().subscribe(data => {
            this.item = data;
            this.chatData.emit(this.item.data().name);
          }) // To get all data matching the document id
          this.subs.push(this.afs.collection('rooms').doc(par.uidRoom)
            .collection('messages', ref => ref.orderBy('time', 'asc'))
            .valueChanges()
            .subscribe(messages => {
              this.messageData = messages;
            }));}
         
          
        })
      );
    });
  }


  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

}
