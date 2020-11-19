import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(firestore:AngularFirestore, private storage: AngularFireStorage, private authService:AuthService,private router:Router)
  {
  }

  @ViewChild('idUser') inputUserid: ElementRef;
  public user$: Observable<User> = this.authService.afAuth.user;

  ngOnInit(): void {
  }


}
