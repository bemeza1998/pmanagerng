import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionUsuariosComponent } from './pages/gestion-usuarios/gestion-usuarios.component';
import { PrimeNgModule } from '../../prime-ng/prime-ng.module';
import { GestionJefaturasComponent } from './pages/gestion-jefaturas/gestion-jefaturas.component';
import { FormsModule } from '@angular/forms';
import { GestionPerfilesComponent } from './pages/gestion-perfiles/gestion-perfiles.component';



@NgModule({
  declarations: [
    GestionUsuariosComponent,
    GestionJefaturasComponent,
    GestionPerfilesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ],
  exports: [
    GestionUsuariosComponent
  ]
})
export class SeguridadModule { }
