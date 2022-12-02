import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AutenticacionService } from '../pmanager/services/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate {

  constructor(
    private autenticactionService: AutenticacionService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> | boolean {
    return this.autenticactionService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  canLoad(): Observable<boolean> | boolean {
    return this.autenticactionService.validarToken()
      .pipe(
        tap(valid => {
          if (!valid) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

}
