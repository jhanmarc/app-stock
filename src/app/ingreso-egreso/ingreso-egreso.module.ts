import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Component
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { OrdenIngresoEgresoPipe } from './orden-ingreso-egreso.pipe';

//Forms
import { ReactiveFormsModule } from '@angular/forms';

//Graficos
import { ChartsModule } from 'ng2-charts';

//Modulos
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';


//Routing
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

//Redux
import { IngresoEgresoReducer } from './ingreso-egreso-reducer';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('ingresoEgreso', IngresoEgresoReducer)
  ],
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe,
  ],

})
export class IngresoEgresoModule { }
