import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Label, MultiDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;

  numIngresos: number;
  numEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso')
                          .subscribe( ingresoEgreso => {
                            this.contarIngresoEgreso( ingresoEgreso.items )
                          })
  }


  contarIngresoEgreso( items: IngresoEgreso[] ) {
    this.ingresos = 0;
    this.egresos = 0;

    this.numEgresos = 0 ;
    this.numIngresos = 0;

    items.forEach( item => {
      if( item.type == 'ingreso'){
        this.numIngresos++;
        this.ingresos += item.amount;
      }else{
        this.numEgresos++;
        this.egresos += item.amount;
      } 
    })

    this.doughnutChartData = [ this.ingresos, this.egresos ]
  }

}
