import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { GestionProyectosComponent } from './pages/gestion-proyectos/gestion-proyectos.component';
import { FormsModule } from '@angular/forms';
import { GestionProductosComponent } from './pages/gestion-productos/gestion-productos.component';
import { ModificacionProductosComponent } from './pages/modificacion-productos/modificacion-productos.component';
import { CalidadProductosComponent } from './pages/calidad-productos/calidad-productos.component';
import { ModificacionProyectosComponent } from './pages/modificacion-proyectos/modificacion-proyectos.component';
import { GestionPerfilesComponent } from './pages/gestion-perfiles/gestion-perfiles.component';



@NgModule({
  declarations: [
    GestionProyectosComponent,
    GestionProductosComponent,
    ModificacionProductosComponent,
    CalidadProductosComponent,
    ModificacionProyectosComponent,
    GestionPerfilesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ]
})
export class ActividadesModule { }
