import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/pages/login/login.component';
import { GestionUsuariosComponent } from './pmanager/seguridad/pages/gestion-usuarios/gestion-usuarios.component';
import { MainComponent } from './shared/main/main.component';
import { HomeComponent } from './pmanager/components/home/home.component';
import { GestionJefaturasComponent } from './pmanager/seguridad/pages/gestion-jefaturas/gestion-jefaturas.component';
import { CambioClaveComponent } from './pmanager/components/cambio-clave/cambio-clave.component';
import { GestionProyectosComponent } from './pmanager/actividades/pages/gestion-proyectos/gestion-proyectos.component';
import { GestionProductosComponent } from './pmanager/actividades/pages/gestion-productos/gestion-productos.component';
import { ModificacionProductosComponent } from './pmanager/actividades/pages/modificacion-productos/modificacion-productos.component';
import { CalidadProductosComponent } from './pmanager/actividades/pages/calidad-productos/calidad-productos.component';
import { ModificacionProyectosComponent } from './pmanager/actividades/pages/modificacion-proyectos/modificacion-proyectos.component';
import { GestionPerfilesComponent } from './pmanager/actividades/pages/gestion-perfiles/gestion-perfiles.component';


const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'usuarios',
                component: GestionUsuariosComponent
            },
            {
                path: 'perfiles',
                component: GestionPerfilesComponent
            },
            {
                path: 'jefaturas',
                component: GestionJefaturasComponent
            },
            {
                path: 'proyectos',
                component: GestionProyectosComponent
            },
            {
                path: 'cambio-clave',
                component: CambioClaveComponent
            },
            {
                path: 'productos',
                component: GestionProductosComponent
            },
            {
                path: 'modificacion-productos',
                component: ModificacionProductosComponent
            },
            {
                path: 'modificacion-proyectos',
                component: ModificacionProyectosComponent
            },
            {
                path: 'calidad-productos',
                component: CalidadProductosComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
