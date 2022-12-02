import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Login } from '../../types/login';
import { JWTResponse } from '../interfaces/JWTResponse.inteface';
import { Usuario } from '../interfaces/usuario.interface';

const URL = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService {

    public usuarioAutenticado: Usuario | null = null;

    constructor(private http: HttpClient, public router: Router) { }

    public login(usuario: Login) {
        return this.http.put<JWTResponse>(`${URL}/usuario/login`, usuario)
            .pipe(
                tap(resp => {
                    if (resp) {
                        localStorage.setItem('token', resp.token!);
                    }
                }),
                map(resp => resp.token),
                catchError(err => of(false))
            );
    }

    public validarToken(): Observable<boolean> {

        const url = `${URL}/usuario/renovar`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        });

        return this.http.get<Usuario>(url, { headers })
            .pipe(
                map(resp => {
                    localStorage.setItem('token', resp.token!);
                    this.usuarioAutenticado = {
                        codUsuario: resp.codUsuario!,
                        codPerfil: resp.codPerfil!,
                        nombre: resp.nombre!,
                        apellido: resp.apellido!,
                        mail: resp.mail!,
                        nombrePerfil: resp.nombrePerfil!
                    }
                    return true;
                }),
                catchError(err => of(false))
            );

    }

    public getUserDataFromLocalStorage(): Usuario | null {
        const rawUserData = localStorage.getItem('userData');
        return JSON.parse(rawUserData!);
    }

    public cerrarSesion() {
        localStorage.clear();
        this.router.navigateByUrl('/login');
    }
}