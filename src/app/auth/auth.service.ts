import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { User } from './user.model';
import { AppState } from '../app.reducer';

import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserAction } from './auth.actions';

import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor( 
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) { }


  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.default.User) => {
      if( fbUser ){
        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
            .subscribe( (userObj:any) => {
              console.log(userObj);
              const newUser = new User( userObj );
              this.store.dispatch( new SetUserAction( newUser) )
            })
      }else{
        this.userSubscription.unsubscribe()
      }
    })
  }

  createUser( nombre:string, email:string, password:string ) {

    // STORE dispach

    this.store.dispatch( new ActivarLoadingAction() )

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
          this.router.navigate(['/']);
          this.store.dispatch( new DesactivarLoadingAction() )
        })
        .catch( error => {
          this.store.dispatch( new DesactivarLoadingAction() )
          Swal.fire('Error en el login', error['message'], 'error' );
        })

    })
    .catch( error => {
      this.store.dispatch( new DesactivarLoadingAction() )
      Swal.fire('Error en el login', error['message'], 'error' );
    })
  }

  login( email:string, password:string ){

    this.store.dispatch( new ActivarLoadingAction() )

    this.afAuth.signInWithEmailAndPassword(email,password)
      .then(resp => {
        this.store.dispatch( new DesactivarLoadingAction() )
        this.router.navigate(['/'])
      })
      .catch( error => {
        this.store.dispatch( new DesactivarLoadingAction() )
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
