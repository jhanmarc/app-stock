import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { User } from './user.model';
import { error } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth: AngularFireAuth, private router: Router, private afDB: AngularFirestore ) { }


  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.default.User) => {
      console.log(fbUser);
    })
  }

  createUser( nombre:string, email:string, password:string ) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then( resp => {
      const user: User = {
        uid: resp.user.uid,
        nombre: nombre,
        email: resp.user.email
      }

      this.afDB.doc(`${user.uid}/usuario`)
        .set( user )
        .then( () => {
          this.router.navigate(['/'])
        })
        .catch( error => {
          Swal.fire('Error en el login', error['message'], 'error' );
        })

    })
    .catch( error => {
      Swal.fire('Error en el login', error['message'], 'error' );
    })
  }

  login( email:string, password:string ){
    this.afAuth.signInWithEmailAndPassword(email,password)
      .then(resp => {
        this.router.navigate(['/'])
      })
      .catch( error => {
        Swal.fire('Error en el login', error['message'], 'error' );
      })
  }

  logout() {
    this.afAuth.signOut();
    this.router.navigate(['/login'])
  }

  isAuth() {
    return this.afAuth.authState
      .pipe(
        map( fbUser => {
          if( fbUser == null) {
            this.router.navigate(['/login'])
          }
          return fbUser != null
        })
      );
  }
}
