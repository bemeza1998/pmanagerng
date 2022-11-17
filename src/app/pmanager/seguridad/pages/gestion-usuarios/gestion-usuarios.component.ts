import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/pmanager/interfaces/usuario.interface';
import { PmanagerService } from 'src/app/pmanager/services/pmanager.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styles: [
  ]
})
export class GestionUsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  displayLoad: boolean = false;
  codUsuario: string = '';
  jefaturas: number[] = [];
  codJefatura: number = 0;
  perfiles: string[] = [];
  codPerfil: string = '';
  nombre: string = '';
  apellido: string = '';
  mail: string = '';

  constructor(private pmanagerService: PmanagerService) {
    this.jefaturas = [1, 2];
    this.perfiles = ['ADM', 'JEF', 'ALP', 'CAL', 'REC'];
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.pmanagerService.obtenerUsuarios('ALL')
      .subscribe((usuarios) => {
        this.usuarios = usuarios;
      })
  }

  showLoadDialog(): void {
    this.displayLoad = true;
  }

  keyboardSubmit(): void {
    const usuario: Usuario = {
      codUsuario: this.codUsuario,
      codJefatura: this.codJefatura,
      codPerfil: this.codPerfil,
      nombre: this.nombre,
      apellido: this.apellido,
      mail: this.mail,
      estado: '',
    };

    console.log(usuario);

    this.pmanagerService.crearUsuario(usuario)
      .subscribe((resp) => {
        console.log(resp);
        this.cargarUsuarios();
      });
  }

}
