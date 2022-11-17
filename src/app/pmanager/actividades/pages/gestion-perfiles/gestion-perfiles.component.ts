import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Perfil } from '../../../interfaces/perfil.interface';
import { PmanagerService } from '../../../services/pmanager.service';

interface Estado {
  sigla: string,
  nombre: string
}

@Component({
  selector: 'app-gestion-perfiles',
  templateUrl: './gestion-perfiles.component.html',
  styles: [
  ]
})
export class GestionPerfilesComponent implements OnInit {

  perfiles: Perfil[] = [];
  displayLoad: boolean = false;
  perfilesClonados: { [s: string]: Perfil; } = {};
  estados: Estado[] = [];
  estadoSeleccionado: string = '';

  codPerfil: string = '';
  nombre: string = '';
  descripcion: string = '';

  constructor(
    private pmanagerService: PmanagerService,
    private messageService: MessageService
  ) {
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
    this.obtenerPerfiles();
  }

  obtenerPerfiles() {
    this.pmanagerService.obtenerPerfiles()
      .subscribe(
        (perfiles) => {
          this.perfiles = perfiles;
        }
      )
  }

  editar(perfil: Perfil) {
    this.perfilesClonados[perfil.codPerfil!] = { ...perfil };
  }

  guardarCambios(perfil: Perfil) {
    delete this.perfilesClonados[perfil.codPerfil!];
    this.pmanagerService.modificarPerfil(perfil)
      .subscribe(() => {
        this.messageService.add(
          { severity: 'success', summary: 'Actualizado', detail: 'Se actualizó el perfil' }
        );
      });
  }

  cancelarCambios(perfil: Perfil, index: number) {
    this.perfiles[index] = this.perfilesClonados[perfil.codPerfil!];
  }

  eliminar(perfil: Perfil) {
    this.pmanagerService.eliminarPerfil(perfil)
      .subscribe(() => {
        this.obtenerPerfiles();
      })
  }

  crear() {
    const perfil: Perfil = {
      codPerfil: this.codPerfil,
      nombre: this.nombre,
      descripcion: this.descripcion,
      estado: this.estadoSeleccionado
    }
    this.pmanagerService.crearPerfil(perfil)
      .subscribe(() => {
        this.obtenerPerfiles();
      })
  }

  mostrarCrear(): void {
    this.displayLoad = true;
  }

}
