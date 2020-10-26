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
  validatorpassword = "^(?=(?:[^A-Z]*[A-Z]){1})(?=(?:[^a-z]*[a-z]){2})(?=(?:[^0-9]*[0-9]){2}).{8,}$";
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('', [
      Validators.pattern(this.validatorpassword),
      Validators.minLength(8)
    ])
  });
  verification = false;
  
  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  //registro con correo electronico 
  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      if (!this.verification) {
        const user = await this.authSvc.register(email, password);
        this.router.navigate(['/configuracion']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  validation(){
    if (this.registerForm.controls.password.errors.pattern) {
      //debugger;
      window.alert("La contraseña debera contener 8 caracteres (minuscular,mayuculas,numeros) ");
      this.verification = false;
    }
    else{
      this.verification = true; 
    }
  }
}
