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
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  roomData: roomData[]=[];
  subs: Subscription[] = [];
  
  @Output() seedValue: EventEmitter<string> = new EventEmitter<string>();
  constructor(private afs:AngularFirestore,private chatService:ChatService ,private authService:AuthService,private router:Router) { }
  public user$: Observable<User> = this.authService.afAuth.user;
  public uidUser: string;
  @ViewChild('idUser') inputUserid: ElementRef;
  ngOnInit(): void {

    //busca los datos de la base de datos 
    this.user$.subscribe(user => {
      this.uidUser = user.uid;
      
      this.subs.push(this.afs.collection('rooms', ref => ref.where("users", "array-contains", this.uidUser)).snapshotChanges()
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
    });
 
  }
  ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  seedData(ev: string): void {
    this.seedValue.emit(ev);
  }
  onFormSubmit(form: NgForm): void {
    const {search} = form.value;
    console.log(search);

    if (form.invalid) {
      return;
    }

    this.afs.collection<roomData>('rooms')
      .valueChanges()
      .pipe(
        map((data: roomData[]) => data.map(s => s.name?.toLowerCase() === form.value.search?.toLowerCase()))
      )
      .subscribe(dataValue => {
        dataValue = dataValue.filter(s => s === true);

        if (dataValue.length > 0) {
          alert('Sorry, room already present');
          return;
        } else {
          if (form.value.search !== null) {
            this.afs.collection('rooms').add({
              name: form.value.search
            });
          } else {
            return;
          }
          form.resetForm();
        }
      });


  }
}
