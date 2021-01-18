import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {


  name:String;

  subcription: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private authService:AuthService, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.subcription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( auth => {
        this.name = auth.user.nombre;
      })
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

  logout() {
    this.ingresoEgresoService.cancelarSubscriptions();
    this.authService.logout();
  }

}
