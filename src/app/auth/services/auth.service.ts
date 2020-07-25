import { Injectable } from '@angular/core';
import {auth } from "firebase/app";
import { AngularFireAuth} from "@angular/fire/auth";
import { User} from "firebase";
import { first } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth:AngularFireAuth) { }
  
  
  async login(email:string,password:string)//con correo y contraseña 
  { 
    try{const user = await this.afAuth.signInWithEmailAndPassword(email, password);
      return user;
    }
    catch (err) {
      console.log(err);
      
    }
    
  }
  //registrarse con email y contraseña 
  async register(email: string, password: string) {
    try {
      const user = await this.afAuth.createUserWithEmailAndPassword(email, password);
      return user;
    }
    catch (err) {
      console.log(err);
      
    }
   }

  //logout del sistema 
  async logout() {
    try {
      await this.afAuth.signOut();
    }
    catch (err) {
      console.log(err);
    }
  }

  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
