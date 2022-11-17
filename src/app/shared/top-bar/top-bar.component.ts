import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from '../../pmanager/services/autenticacion.service';
import { Usuario } from 'src/app/types/usuario';

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
    const usuario = this.autenticacionService.getUserDataFromLocalStorage();
    this.nombre = usuario?.nombre!;
    this.apellido = usuario?.apellido!;
    this.perfil = usuario?.codPerfil!;
  }

  logout() {
    this.autenticacionService.cerrarSesion();
  }

}
