import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import { IngresoEgreso } from './ingreso-egreso.model';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso-actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListerSubcription: Subscription = new Subscription;
  ingresoEgresoItemsSubcription: Subscription = new Subscription;

  constructor( private afDB: AngularFirestore, private authService: AuthService, private stote: Store<AppState> ) { }

  initIngresoEgresoListener(){
    this.ingresoEgresoListerSubcription = this.stote.select('auth')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( auth => this.ingresoEgresoItems(auth.user.uid))
  }

  private ingresoEgresoItems( uid:string ){
    this.ingresoEgresoItemsSubcription = this.afDB.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( docData => {
          return docData.map( doc => {
            return {
              ...doc.payload.doc.data() as {},
              uid: doc.payload.doc.id,
              
            }
          })
        })
      )
      .subscribe( (coleccion: any[]) => {
        this.stote.dispatch( new SetItemsAction(coleccion));
      })
  }

  cancelarSubscriptions() {
    this.stote.dispatch( new UnsetItemsAction() );
    this.ingresoEgresoListerSubcription.unsubscribe();
    this.ingresoEgresoItemsSubcription.unsubscribe();
  }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUser();
    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }

  deleteIngresoEgreso( uid: string ){
    const user = this.authService.getUser();

    return this.afDB.doc(`${user.uid}/ingresos-egresos/items/${ uid }`)
      .delete();
  }

}
