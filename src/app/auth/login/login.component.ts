import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService} from "../services/auth.service";
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
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
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
     if (user && user.user.emailVerified) {
       //redireccion a la home page
       this.router.navigate(["/home"]);
     }
     else if (user) {
       this.router.navigate(["/verificacion"]);
     }
     else {
      window.alert("La contraseña o el email estan incorrectos");
     }
   }
   catch (err) {
     console.log(err);
     window.alert("La contraseña o el email estan incorrectos");
   }
 }
  
 getErrorMessage() {
  if (this.loginForm.hasError('required')) {
    return 'Ingresa un valor';
  }

  return this.loginForm.hasError('email') ? 'email no valido' : '';
 }
  //login con l acuenta de google
 async onGoogleLogin() {
   try {
    const user = await this.authSvc.loginGoogle();
    this.router.navigate(['/home']);
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
 private checkUserIsVerified(user: any) {
  if (user && user.emailVerified) {
    this.router.navigate(['/home']);
  } else if (user) {
    this.router.navigate(['/verification-email']);
  } else {
    this.router.navigate(['/register']);
  }
}

}
