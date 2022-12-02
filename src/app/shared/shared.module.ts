import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './menu/menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { RouterModule } from '@angular/router';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CambioClaveComponent,
    MainComponent,
    MenuComponent,
    TopBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PrimeNgModule
  ]
})
export class SharedModule { }
