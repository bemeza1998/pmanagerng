import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../pmanager/services/autenticacion.service';
import { PerfilesRev } from '../types/perfiles';

@Injectable({
    providedIn: 'root'
})
export class ValidarRutaGuard implements CanActivate {

    constructor(
        private autenticactionService: AutenticacionService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {

        const perfil: string = this.autenticactionService.usuarioAutenticado?.codPerfil!;
        const ruta: string = route.url.toString();

        if (perfil === PerfilesRev.ADM && (ruta === 'usuarios' || ruta === 'perfiles')) {
            return true;
        }

        if (perfil === PerfilesRev.JEF && (ruta === 'modificacion-proyectos' || ruta === 'modificacion-productos')) {
            return true;
        }

        if (perfil === PerfilesRev.CAL && ruta === 'calidad-productos') {
            return true;
        }

        if (perfil === PerfilesRev.ALP && (ruta === 'proyectos' || ruta === 'empresas' || ruta === 'modificacion-productos')) {
            return true;
        }

        if (perfil === PerfilesRev.REC && ruta === 'productos') {
            return true;
        }

        this.router.navigateByUrl('/');
        return false;

    }
}
