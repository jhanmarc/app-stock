import { Component, OnInit } from '@angular/core';
import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  

  constructor(private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoEgresoService.initIngresoEgresoListener();

  }

  async getDatos(){
    await console.log("traer 1");
    await console.log("traer 2");
    await console.log("traer 2");
  }

}
