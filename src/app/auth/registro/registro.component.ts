import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService} from "../services/auth.service";
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  hide= true;
  registerForm = new FormGroup({
  email : new FormControl(''),
  password: new FormControl('')
  })
  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  //registro con correo electronico 
  async onRegister() {
    
    const { email, password } = this.registerForm.value;
    try {
      const user=await this.authSvc.register(email, password);
      if (user) {
        //redireccion a la pagina login 
        this.router.navigate(["/verificacion"]);
      }
    }
    catch (err){
      console.log(err);
    }
  }
  getErrorMessage() {
    if (this.registerForm.hasError('required')) {
      return 'YIngresa un valor';
    }
  
    return this.registerForm.hasError('email') ? 'email no valido' : '';
  }
}
