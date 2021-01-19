import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { UsernameValidators} from '../../Validators/usernameValidator';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('',Validators.email),
    password: new FormControl('', [
      Validators.pattern("^(?=(?:[^A-Z]*[A-Z]){1})(?=(?:[^a-z]*[a-z]){2})(?=(?:[^0-9]*[0-9]){2}).{8,}$")
    ])
  });
  verification = false;
  
  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  //registro con correo electronico 
  async onRegister() {
    const { email, password } = this.registerForm.value;
    if (password==""||email=="") {
      this.verification = false;
    }
    console.log(this.verification);
    try {
      if (this.verification) {
        const user = await this.authSvc.register(email, password);
      }else{
        window.alert("Completa todos los campos");
      }
    } catch (error) {
      //console.log(error);
    }
  }
//    if (this.registerForm.controls.password.errors.pattern) {
  validation() { 
    try {
      if (this.registerForm.controls.password.errors.pattern) {
      window.alert("La contraseña debera contener 8 caracteres (minuscular,mayuculas,numeros) ");
      this.verification = false;
    }
    else{
      this.verification = true; 
    }
    } catch (err) {
      this.verification = true; 
    }
    
  }
  validation2() {
    try {
      if (this.registerForm.controls.email.errors.email) {
      window.alert("Esa no es una cuenta de correo electronico");
      this.verification = false;
    }
    else{
      this.verification = true; 
    }
    } catch (err) {
      this.verification = true; 
    }
  }
}
