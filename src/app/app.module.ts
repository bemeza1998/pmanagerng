import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { SeguridadModule } from './pmanager/seguridad/seguridad.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './shared/main/main.component';
import { HomeComponent } from './pmanager/components/home/home.component';
import { CambioClaveComponent } from './pmanager/components/cambio-clave/cambio-clave.component';
import { MenuComponent } from './shared/menu/menu.component';

import { SlideMenuModule } from 'primeng/slidemenu';
import { GestionProyectosComponent } from './pmanager/actividades/pages/gestion-proyectos/gestion-proyectos.component';
import { ActividadesModule } from './pmanager/actividades/actividades.module';
import { MessageService } from 'primeng/api';
import { TopBarComponent } from './shared/top-bar/top-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuComponent,
    HomeComponent,
    CambioClaveComponent,
    TopBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ActividadesModule,
    AuthModule,
    SeguridadModule,
    AppRoutingModule,
    HttpClientModule,
    SlideMenuModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
