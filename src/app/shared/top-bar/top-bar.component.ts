import { Component, OnInit } from '@angular/core';
import { Perfiles } from 'src/app/types/perfiles';
import { AutenticacionService } from '../../pmanager/services/autenticacion.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styles: [
  ]
})
export class TopBarComponent implements OnInit {

  nombre: string = '';
  apellido: string = '';
  perfil: string = '';

  constructor(private autenticacionService: AutenticacionService) {
  }

  ngOnInit(): void {
    const usuario = this.autenticacionService.usuarioAutenticado;
    this.nombre = usuario?.nombre!;
    this.apellido = usuario?.apellido!;
    const userRoles = Perfiles;
    const perfil = this.autenticacionService.usuarioAutenticado?.codPerfil! as keyof typeof userRoles
    this.perfil = userRoles[perfil]!;
  }

  logout() {
    this.autenticacionService.cerrarSesion();
  }

}
