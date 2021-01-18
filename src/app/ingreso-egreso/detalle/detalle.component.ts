import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
// import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { IngresoEgresoService } from '../ingreso-egreso.service';

import Swal from 'sweetalert2';
import { filter } from 'rxjs/operators';
import { AppEgresoIngresoState } from '../ingreso-egreso-reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

   
  items: IngresoEgreso[];
  subcription: Subscription = new Subscription()
  
  search="";


  

  constructor( private store: Store<AppEgresoIngresoState>, private ingresoEgresoService: IngresoEgresoService ) { 
    this.items = [];
   }

  ngOnInit(): void {
    
    this.subcription = this.store.select('ingresoEgreso')
      .pipe(
        filter( ingresoEgreso => {
          
          return ingresoEgreso.items.length != 0
        } )
      )
      .subscribe( ingresoEgreso => {
        this.items = ingresoEgreso.items
      })
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

  borrarItem( item: IngresoEgreso  ){
    this.ingresoEgresoService.deleteIngresoEgreso( item.uid )
      .then(() => {
        Swal.fire('Eliminado', item.description, 'success');
      })
  }

  buscador(value:string){
    console.log(value);
  }

}
