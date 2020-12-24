import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { User } from '../shared/models/user.inteface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showButtonCreate = false;
  constructor(private auth: AuthService) { 
  }
  public user$: Observable<User> = this.auth.afAuth.user;
  ngOnInit(): void {
  }
  
}
