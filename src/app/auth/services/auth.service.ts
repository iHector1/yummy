import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {  AngularFirestore,AngularFirestoreDocument} from '@angular/fire/firestore';
import { User } from 'src/app/shared/models/user.inteface';
import { RoleValidator } from 'src/app/Validators/Validator_register';



@Injectable({
  providedIn: 'root'
})
export class AuthService extends RoleValidator{
  
  public user$: Observable<User>;//variable en la cual se guarda el usuario
  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    super();
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  //metodo para el login con google
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
  //metodo para el login con facebook
  async loginFacebook(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.FacebookAuthProvider()
      );
      return user;
    }
    catch (error) {
      console.log(error);
    }
    
  }
  //metodo para resetear la contraseña 
  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);//envio de correo electronico
    } catch (error) {
      console.log(error);
    }
  }

  //metodo para el envio de correo de verificacion 
  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  //metodo para el inicio de sesion con correo y contraseña
  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  //metodo de registrado mediante correo y contraseña
  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  //metdodo para cerraar sesion
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  //ingreso de datos el registro de usuario
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `infoUser/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified, 
      blocked:user.blocked,
    };

    return userRef.set(data, { merge: true });
  }

  private updateUserDataRegister(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `registerUser/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      blocked:user.blocked,
    };

    return userRef.set(data, { merge: true });
  }

  private updateUserDataPremiun(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `premiunCreator/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      blocked:user.blocked,
    };

    return userRef.set(data, { merge: true });
  }
}

