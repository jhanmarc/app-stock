import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';


@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  formIE: FormGroup;
  tipo = 'ingreso';

  loadingSubs: Subscription = new Subscription;
  cargando: boolean;
 
  constructor( private ingresoEgresoService: IngresoEgresoService, private store: Store<AppState> ) { }


  ngOnInit(): void {
    this.loadingSubs = this.store.select('ui')
                        .subscribe( ui => this.cargando = ui.isLoading );

    this.formIE = new FormGroup({
      'description': new FormControl('', Validators.required),
      'amount': new FormControl(1, Validators.min(1))
    })
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe();
  }

  crearIngresoEgreso(){
    this.store.dispatch( new ActivarLoadingAction )
    const ingresoEgreso = new IngresoEgreso( { ...this.formIE.value, type: this.tipo } )
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then( () => {
        this.store.dispatch( new DesactivarLoadingAction )
        Swal.fire('Creado', ingresoEgreso.description, 'success')
        this.formIE.reset({amount: 1 })
        this.tipo = 'ingreso'
      });

    
  }

  get description() {return this.formIE.get('description'); }
  get amount() {return this.formIE.get('amount'); }



}
