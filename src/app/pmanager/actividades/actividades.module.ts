import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { CalidadProductosComponent } from './pages/calidad-productos/calidad-productos.component';
import { GestionProductosComponent } from './pages/gestion-productos/gestion-productos.component';
import { GestionProyectosComponent } from './pages/gestion-proyectos/gestion-proyectos.component';
import { ModificacionProductosComponent } from './pages/modificacion-productos/modificacion-productos.component';
import { ModificacionProyectosComponent } from './pages/modificacion-proyectos/modificacion-proyectos.component';

@NgModule({
  declarations: [
    GestionProyectosComponent,
    GestionProductosComponent,
    ModificacionProductosComponent,
    CalidadProductosComponent,
    ModificacionProyectosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class ActividadesModule { }
