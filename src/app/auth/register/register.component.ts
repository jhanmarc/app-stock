import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  cargando: boolean
  subscription: Subscription = new Subscription();

  constructor( private authService: AuthService, private store: Store<AppState> ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading)
  }

  onSubmit( data: any ) {
    this.authService.createUser( data['nombre'], data['email'], data['password'])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
