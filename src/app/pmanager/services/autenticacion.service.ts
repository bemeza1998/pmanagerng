import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Usuario } from 'src/app/types/usuario';
import { environment } from 'src/environments/environment';
import { Login } from '../../types/login';

const URL = environment.baseUrl;

@Injectable({
    providedIn: 'root'
})
export class AutenticacionService {

    public usuarioAutenticado: Usuario | null = null;

    constructor(private http: HttpClient, public router: Router) { }

    public login(usuario: Login): Observable<Usuario> {
        return this.http.put<Usuario>(`${URL}/usuario/login`, usuario)
            .pipe(
                tap((user) => {
                    this.usuarioAutenticado = user;
                }),
                tap(this.saveUserDataToLocalStorage)
            );
    }

    public getUserDataFromLocalStorage(): Usuario | null {
        const rawUserData = localStorage.getItem('userData');
        return JSON.parse(rawUserData!);
    }

    private saveUserDataToLocalStorage(usuario: Usuario): void {
        if (usuario === null) return;
        localStorage.setItem('userData', JSON.stringify(usuario));
    }

    public cerrarSesion() {
        localStorage.removeItem('userData');
        this.router.navigateByUrl('/productos');
    }
}