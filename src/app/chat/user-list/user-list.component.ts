import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { roomData } from 'src/app/shared/models/roomData.interface';
import { User } from 'src/app/shared/models/user.inteface';
import { ChatService } from '../service/chat.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  roomData: roomData[]=[];
  subs: Subscription[] = [];
  
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();
  constructor(private afs:AngularFirestore,private chatService:ChatService ,private authService:AuthService,private router:Router) { }
  public user$: Observable<User> = this.authService.afAuth.user;
  public uidUser: string = this.authService.userUidR();
  @ViewChild('idUser') inputUserid: ElementRef;
  ngOnInit(): void {
    console.log(this.uidUser);
    //genera 20 valores en el arreglo
    //busca los datos de la base de datos 
    this.subs.push(this.afs.collection('rooms',ref=>ref.where("users","array-contains",this.router.url.slice(6))).snapshotChanges()
    .pipe(
      map(actions => {
        return actions.map(a => {

          return {
            id: a.payload.doc.id,
            // @ts-ignore
            ...a.payload.doc.data()
          };
        });
      })
    ).subscribe((rooms: roomData[]) => {
      this.roomData = rooms;
    }));
  }
  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  seedData(ev: string): void {
    this.seedValue.emit(ev);
  }

}
 