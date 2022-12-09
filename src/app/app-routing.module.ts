import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/pages/login/login.component';
import { GestionUsuariosComponent } from './pmanager/seguridad/pages/gestion-usuarios/gestion-usuarios.component';
import { MainComponent } from './shared/main/main.component';
import { HomeComponent } from './pmanager/components/home/home.component';
import { GestionJefaturasComponent } from './pmanager/seguridad/pages/gestion-jefaturas/gestion-jefaturas.component';
import { CambioClaveComponent } from './shared/cambio-clave/cambio-clave.component';
import { GestionProyectosComponent } from './pmanager/actividades/pages/gestion-proyectos/gestion-proyectos.component';
import { GestionProductosComponent } from './pmanager/actividades/pages/gestion-productos/gestion-productos.component';
import { ModificacionProductosComponent } from './pmanager/actividades/pages/modificacion-productos/modificacion-productos.component';
import { CalidadProductosComponent } from './pmanager/actividades/pages/calidad-productos/calidad-productos.component';
import { ModificacionProyectosComponent } from './pmanager/actividades/pages/modificacion-proyectos/modificacion-proyectos.component';
import { GestionPerfilesComponent } from './pmanager/seguridad/pages/gestion-perfiles/gestion-perfiles.component';
import { ValidarTokenGuard } from './guards/validar-token.guard';
import { GestionEmpresasComponent } from './pmanager/actividades/pages/gestion-empresas/gestion-empresas.component';
import { ValidarRutaGuard } from './guards/validar-ruta.guard';


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
                component: HomeComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'cambio-clave',
                component: CambioClaveComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'usuarios',
                component: GestionUsuariosComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
            },
            {
                path: 'perfiles',
                component: GestionPerfilesComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
            },
            {
                path: 'jefaturas',
                component: GestionJefaturasComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
            },

            {
                path: 'proyectos',
                component: GestionProyectosComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
            },
            {
                path: 'productos',
                component: GestionProductosComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
            },
            {
                path: 'modificacion-productos',
                component: ModificacionProductosComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
            },
            {
                path: 'modificacion-proyectos',
                component: ModificacionProyectosComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
            },
            {
                path: 'empresas',
                component: GestionEmpresasComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
            },
            {
                path: 'calidad-productos',
                component: CalidadProductosComponent,
                canActivate: [ValidarTokenGuard, ValidarRutaGuard]
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
