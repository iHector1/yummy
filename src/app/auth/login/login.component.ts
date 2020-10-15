import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService} from "../services/auth.service";
import {  User } from '../../shared/models/user.inteface';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  //varible del form ccs
  hide = true;
  //varible del login
  loginForm = new FormGroup({ 
    email: new FormControl(''),
    password: new FormControl('')
  });
   
  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  //login con correo y contraseña
 async  onLogin() {
  const { email, password } = this.loginForm.value;
  try {
    const user = await this.authSvc.login(email, password);
    if (user) {
      this.checkUserIsVerified(user);
    }
  } catch (error) {
    console.log(error);
  }
 }
  
 getErrorMessage() {
  if (this.loginForm.hasError('required')) {
    return 'Ingresa un valor';
  }
  return this.loginForm.hasError('email') ? 'email no valido' : '';
  }
  

  //login con la cuenta de google
 async onGoogleLogin() {
  try {
    const user = await this.authSvc.loginGoogle();
    if (user) {
      this.checkUserIsVerified(user);
    }
  } catch (error) {
    console.log(error);
  }
  }
  

  async onFacebookLogin() {
    try {
      const user = await this.authSvc.loginFacebook();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

  //login con la cuenta de facebook
 private checkUserIsVerified(user: User) {
  if (user && user.emailVerified) {
    this.router.navigate(['/home']);
  } else if (user) {
    this.router.navigate(['/verificacion']);
  } else {
    this.router.navigate(['/register']);
  }
}

}
