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
  
  //login con correo y contraseña 
  async login(email:string,password:string)
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
      this.sendVerificacionEmail()  ;
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
  //vemos quin es el que esta haciendo login
  getCurrentUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  //envio de verificaion del email
  async sendVerificacionEmail():Promise<any> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }
  //resetiear la contraseña
  async resetPassword(email: string):Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log(error);
    }    
  }
  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.GoogleAuthProvider()
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async loginFacebook(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.FacebookAuthProvider()
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}
