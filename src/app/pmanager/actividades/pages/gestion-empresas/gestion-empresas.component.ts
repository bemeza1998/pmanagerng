import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PmanagerService } from 'src/app/pmanager/services/pmanager.service';
import { Empresa } from '../../../interfaces/empresa.interface';

@Component({
  selector: 'app-gestion-empresas',
  templateUrl: './gestion-empresas.component.html',
  styles: [
  ]
})
export class GestionEmpresasComponent implements OnInit {

  displayLoad: boolean = false;
  empresasClonadas: { [s: number]: Empresa; } = {};

  empresas: Empresa[] = [];

  nombreEmpresa: string = '';
  direccionEmpresa: string = '';
  telefonoEmpresa: string = '';
  mailEmpresa: string = '';
  clienteActivo: string = '';

  estadoClienteActivo = [
    {
      valor: 'S',
      texto: 'Cliente activo'
    },
    {
      valor: 'N',
      texto: 'Cliente inactivo'
    }
  ];

  estadoClienteMap = {
    'S': 'Cliente activo',
    'N': 'Cliente inactivo'
  }


  constructor(private pmanagerService: PmanagerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerEmpresas();
  }

  obtenerEmpresas() {
    this.pmanagerService.obtenerEmpresas('ALL')
      .subscribe((empresas) => {
        this.empresas = empresas;
      })
  }

  showLoadDialog(): void {
    this.displayLoad = true;
  }

  crearEmpresa() {
    const empresa = {
      nombreEmpresa: this.nombreEmpresa,
      direccion: this.direccionEmpresa,
      telefono: this.telefonoEmpresa,
      mail: this.mailEmpresa,
      clienteActivo: this.clienteActivo
    }
    this.pmanagerService.crearEmpresa(empresa)
      .subscribe((resp) => {
        this.empresas.unshift(resp);
      })
  }

  editar(empresa: Empresa) {
    this.empresasClonadas[empresa.codEmpresa!] = { ...empresa };
  }

  guardarCambios(empresa: Empresa) {
    delete this.empresasClonadas[empresa.codEmpresa!];
    this.pmanagerService.modificarEmpresa(empresa)
      .subscribe((resp) => {
        this.messageService.add(
          { severity: 'success', summary: 'Actualizado', detail: 'Se actualizó la empresa' }
        );
        this.empresas.splice(this.empresas.map(e => e.codEmpresa).indexOf(empresa.codEmpresa), 1, resp);
      });
  }

  cancelarCambios(empresa: Empresa, index: number) {
    this.empresas[index] = this.empresasClonadas[empresa.codEmpresa!];
  }

  eliminar(empresa: Empresa) {
    empresa.clienteActivo = 'N';
    this.pmanagerService.modificarClienteActivoEmpresa(empresa)
      .subscribe(() => {
        this.empresas.splice(this.empresas.map(e => e.codEmpresa).indexOf(empresa.codEmpresa), 1);
      })
  }

}
