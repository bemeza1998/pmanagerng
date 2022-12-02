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
                path: 'usuarios',
                component: GestionUsuariosComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'perfiles',
                component: GestionPerfilesComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'jefaturas',
                component: GestionJefaturasComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'proyectos',
                component: GestionProyectosComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'cambio-clave',
                component: CambioClaveComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'productos',
                component: GestionProductosComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'modificacion-productos',
                component: ModificacionProductosComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'modificacion-proyectos',
                component: ModificacionProyectosComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'empresas',
                component: GestionEmpresasComponent,
                canActivate: [ValidarTokenGuard]
            },
            {
                path: 'calidad-productos',
                component: CalidadProductosComponent,
                canActivate: [ValidarTokenGuard]
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
