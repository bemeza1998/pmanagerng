import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { SeguridadModule } from './pmanager/seguridad/seguridad.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pmanager/components/home/home.component';

import { ActividadesModule } from './pmanager/actividades/actividades.module';
import { MessageService } from 'primeng/api';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ActividadesModule,
    AppRoutingModule,
    AuthModule,
    SeguridadModule,
    SharedModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
