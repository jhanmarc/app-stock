import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';
import { AppState } from '../../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  name:string;
  subcription: Subscription = new Subscription();


  constructor(private store:Store<AppState>) { }

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

}
