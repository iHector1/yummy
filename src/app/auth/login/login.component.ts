import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService} from "../services/auth.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  hide: true;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
   f:boolean;
  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
 async  onLogin() {
    const { email, password } = this.loginForm.value;
   try {
     const user = await this.authSvc.login(email, password);
     if (user) {
       //redireccion a la home page
       this.router.navigate(["/home"]);
     }
   }
   catch (err) {
     console.log(err);
      this.f = true;
   }
 }
 getErrorMessage() {
  if (this.loginForm.hasError('required')) {
    return 'YIngresa un valor';
  }

  return this.loginForm.hasError('email') ? 'email no valido' : '';
}

}
