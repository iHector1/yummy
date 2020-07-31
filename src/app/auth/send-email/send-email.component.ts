import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css'],
  providers:[AuthService],
})
export class SendEmailComponent implements OnInit {
public user$: Observable<User> = this.authSvc.afAuth.user;

  ngOnInit(): void {
  }
  constructor(private authSvc: AuthService) {}
  onSendEmail(): void {
    this.authSvc.sendVerificationEmail();
  }
}
