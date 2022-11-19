import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PmanagerService } from 'src/app/pmanager/services/pmanager.service';
import { Jefatura } from '../../../interfaces/jefatura.interface';

@Component({
  selector: 'app-gestion-jefaturas',
  templateUrl: './gestion-jefaturas.component.html',
  styles: [
  ]
})
export class GestionJefaturasComponent implements OnInit {

  jefaturas: Jefatura[] = [];
  displayLoad: boolean = false;
  jefaturasClonados: { [s: number]: Jefatura; } = {};

  nombre: string = '';
  siglas: string = '';

  constructor(
    private pmanagerService: PmanagerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerJefaturas()
  }

  obtenerJefaturas() {
    this.pmanagerService.obtenerJefaturas()
      .subscribe((jefaturas) => {
        this.jefaturas = jefaturas;
      });
  }

  editar(jefatura: Jefatura) {
    this.jefaturasClonados[jefatura.codJefatura!] = { ...jefatura };
  }

  guardarCambios(jefatura: Jefatura) {
    delete this.jefaturasClonados[jefatura.codJefatura!];
    this.pmanagerService.modificarJefatura(jefatura)
      .subscribe((resp) => {
        this.messageService.add(
          { severity: 'success', summary: 'Actualizado', detail: 'Se actualizó la jefatura' }
        );
        this.jefaturas.splice(this.jefaturas.map(j => j.codJefatura).indexOf(jefatura.codJefatura), 1, resp);
      });
  }

  cancelarCambios(jefatura: Jefatura, index: number) {
    this.jefaturas[index] = this.jefaturasClonados[jefatura.codJefatura!];
  }

  eliminar(jefatura: Jefatura) {
    this.pmanagerService.eliminarJefatura(jefatura)
      .subscribe(() => {
        this.messageService.add(
          { severity: 'error', summary: 'Eliminado', detail: 'Se eliminó la jefatura' }
        );
        this.jefaturas.splice(this.jefaturas.map(j => j.codJefatura).indexOf(jefatura.codJefatura), 1);
      })
  }

  crear() {
    const jefatura: Jefatura = {
      siglas: this.siglas,
      nombre: this.nombre
    }
    this.pmanagerService.crearJefatura(jefatura)
      .subscribe((resp) => {
        this.messageService.add(
          { severity: 'success', summary: 'Creado', detail: 'Se creó la jefatura' }
        );
        this.jefaturas.unshift(resp);
      })
  }

  mostrarCrear(): void {
    this.displayLoad = true;
  }

}
