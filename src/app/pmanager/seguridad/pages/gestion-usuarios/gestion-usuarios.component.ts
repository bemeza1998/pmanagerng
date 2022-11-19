import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Estado } from 'src/app/pmanager/interfaces/estado.interface';
import { Usuario } from 'src/app/pmanager/interfaces/usuario.interface';
import { PmanagerService } from 'src/app/pmanager/services/pmanager.service';
import { Perfil } from '../../../interfaces/perfil.interface';

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
  perfiles: Perfil[] = [];
  codPerfil: string = '';
  nombre: string = '';
  apellido: string = '';
  mail: string = '';
  usuariosClonados: { [s: string]: Usuario; } = {};
  estados: Estado[] = [];

  constructor(
    private pmanagerService: PmanagerService,
    private messageService: MessageService
  ) {
    this.jefaturas = [1, 2];
    this.estados = [
      {
        sigla: 'ACT',
        nombre: 'Activo'
      },
      {
        sigla: 'INA',
        nombre: 'Inactivo'
      }
    ];
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.pmanagerService.obtenerPerfiles()
      .subscribe((perfiles) => {
        this.perfiles = perfiles
      })
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
      estado: ''
    };

    console.log(usuario);

    this.pmanagerService.crearUsuario(usuario)
      .subscribe((usuario) => {
        this.usuarios.unshift(usuario);
      });
  }

  editar(usuario: Usuario) {
    this.usuariosClonados[usuario.codPerfil!] = { ...usuario };
  }

  guardarCambios(usuario: Usuario) {
    delete this.usuariosClonados[usuario.codPerfil!];
    this.pmanagerService.modificarUsuario(usuario)
      .subscribe((resp) => {
        this.messageService.add(
          { severity: 'success', summary: 'Actualizado', detail: 'Se actualizó el usuario.' }
        );
        this.usuarios.splice(this.usuarios.map(u => u.codUsuario).indexOf(usuario.codUsuario), 1, resp);
      });
  }

  cancelarCambios(usuario: Usuario, index: number) {
    this.usuarios[index] = this.usuariosClonados[usuario.codPerfil!];
  }

  eliminar(usuario: Usuario) {
    usuario.estado = 'INA';
    this.pmanagerService.modificarEstadoUsuario(usuario)
      .subscribe((usuario) => {
        this.usuarios.splice(this.usuarios.map(u => u.codUsuario).indexOf(usuario.codUsuario), 0);
      })
  }

}
