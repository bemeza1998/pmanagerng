import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Proyecto } from 'src/app/pmanager/interfaces/proyecto.interface';
import { PmanagerService } from 'src/app/pmanager/services/pmanager.service';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { Empresa } from '../../../interfaces/empresa.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-gestion-proyectos',
  templateUrl: './gestion-proyectos.component.html',
  styles: [
  ],
  providers: [ConfirmationService, MessageService]
})
export class GestionProyectosComponent implements OnInit {

  @ViewChild('crearProyecto') crearFormulario!: NgForm;


  displayLoad: boolean = false;
  proyectos: Proyecto[] = [];

  usuario = this.autenticacionService.usuarioAutenticado;

  codProyecto: number = 0;
  identificadorProyecto: string = '';
  codUsuario: string = this.usuario?.codUsuario!;
  codJefatura: number = 1;
  nombre: string = '';
  descripcion: string = '';
  estado: string = 'ACT';
  valorEntrega: number = 0;
  diasContrato: number = 0;
  valorDia: number = 0;
  valorHora: number = 0;
  fechaInicio: Date = new Date();
  fechaFinalizacion: Date = new Date();
  accion: string = 'SOL';
  empresas: Empresa[] = [];
  codEmpresa: number = 0;
  loading: boolean = false;

  comentarioSolicitudModificacion: string = '';

  estadoSolicitudMap = {
    'SOL': 'Solicitado para editar',
    'SEL': 'Solicitado para eliminar',
    'APR': 'Aprobado para editar',
    'APE': 'Aprobado para eliminar',
    'NEG': 'Negado para editar',
    'NGE': 'Negado para eliminar',
    'NOS': 'No solicitado'
  }

  estadoActivo = {
    'ACT': 'Activo',
    'INA': 'Inactivo'
  }

  estadosSelect = [
    { siglas: 'ACT', nombre: 'Activo' },
    { siglas: 'INA', nombre: 'Inactivo' }
  ]

  constructor(private pmanagerService: PmanagerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private autenticacionService: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarEmpresas();
  }

  cargarEmpresas() {
    this.pmanagerService.obtenerEmpresas('S')
      .subscribe((empresas) => {
        this.empresas = empresas;
      });
  }

  cargarProyectos() {
    this.pmanagerService.obtenerPorJefatura(1)
      .subscribe((proyectos) => {
        this.proyectos = proyectos;
        this.loading = false;
      })
  }

  showLoadDialog(): void {
    this.displayLoad = true;
  }

  keyboardSubmit(): void {
    this.displayLoad = false;
    const proyecto: Proyecto = {
      codProyecto: this.codProyecto,
      identificadorProyecto: this.identificadorProyecto,
      codUsuario: this.codUsuario,
      codJefatura: this.codJefatura,
      nombre: this.nombre,
      descripcion: this.descripcion,
      estado: this.estado,
      valorEntrega: this.valorEntrega,
      diasContrato: this.diasContrato,
      valorDia: this.valorDia,
      valorHora: this.valorHora,
      fechaInicio: this.fechaInicio.toISOString(),
      fechaFinalizacion: this.fechaFinalizacion.toISOString(),
      estadoSolicitudModificacion: 'NOS',
      nombreUsuarioCompleto: `${this.usuario?.nombre} ${this.usuario?.apellido}`,
      codEmpresa: this.codEmpresa
    };
    this.pmanagerService.crearProyecto(proyecto)
      .subscribe({
        next: (proy) => {
          this.proyectos.unshift(proy);
          this.messageService.add({ severity: 'info', summary: 'Proyecto creado', detail: 'El proyecto se creó exitosamente.' });
        },
        error: (err) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
        }
      })
    /*.subscribe((proy) => {
      this.proyectos.unshift(proy);
    });*/
  }

  cargarTabla() {
    this.loading = true;
  }

  calcularValorDia() {
    if (this.valorEntrega !== 0 && this.diasContrato !== 0) {
      this.valorDia = this.valorEntrega / this.diasContrato;
      this.valorHora = this.valorDia / 8;
    } else {
      this.valorDia = 0;
      this.valorHora = 0;
    }
  }

  calcularValoresModificarProyecto(proyecto: Proyecto) {
    if (proyecto.valorEntrega !== 0 && proyecto.diasContrato !== 0) {
      proyecto.valorDia = proyecto.valorEntrega! / proyecto.diasContrato!;
      proyecto.valorHora = proyecto.valorDia / 8;
    } else {
      proyecto.valorDia = 0;
      proyecto.valorHora = 0;
    }
  }

  solicitarEstado(proyecto: Proyecto) {

    this.confirmationService.confirm({
      message: `Solicitar la modificación del proyecto ${proyecto.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        proyecto.estadoSolicitudModificacion = this.accion;
        proyecto.comentarioSolicitudModificacion = this.comentarioSolicitudModificacion;
        this.pmanagerService.modificarEstadoSolicitudProyecto(proyecto)
          .subscribe((resp) => {
            proyecto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.messageService.add({ severity: 'info', summary: 'Solicitud exitosa', detail: `Se ha solicitado la modificación.` });
        this.comentarioSolicitudModificacion = '';
      },
      reject: () => {
        this.comentarioSolicitudModificacion = '';
      }
    });
  }

  solicitarCambio(proyecto: Proyecto) {
    return (proyecto.estadoSolicitudModificacion === 'NOS'
      || proyecto.estadoSolicitudModificacion === 'NGE'
      || proyecto.estadoSolicitudModificacion === 'NEG');
  }

  cancelarSolicitud(proyecto: Proyecto) {
    this.confirmationService.confirm({
      message: `¿ Está seguro de cancelar la solicitud ?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        proyecto.estadoSolicitudModificacion = 'NOS';
        proyecto.comentarioSolicitudModificacion = '';
        this.pmanagerService.modificarEstadoSolicitudProyecto(proyecto)
          .subscribe((resp) => {
            proyecto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.messageService.add({ severity: 'info', summary: 'Solicitud exitosa', detail: `Se ha cancelado la solicitud.` });
        this.comentarioSolicitudModificacion = '';
      },
      key: 'cancelarSolicitud'
    });
  }

  eliminarProyecto(proyecto: Proyecto) {
    this.confirmationService.confirm({
      message: `¿ Está seguro de eliminar el proyecto ?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        proyecto.estadoSolicitudModificacion = 'ELI';
        this.pmanagerService.modificarEstadoSolicitudProyecto(proyecto)
          .subscribe((resp) => {
            proyecto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.proyectos = this.proyectos.filter((item) => item !== proyecto);
        this.messageService.add({ severity: 'info', summary: 'Eliminación exitosa', detail: `Se ha eliminado el proyecto.` });
      },
      key: 'cancelarSolicitud'
    });
  }

  clonedProyectos: { [s: number]: Proyecto; } = {};

  editar(proyecto: Proyecto) {
    this.clonedProyectos[proyecto.codProyecto!] = { ...proyecto };
  }


  guardarCambios(proyecto: Proyecto) {
    //if (product.price > 0) {
    delete this.clonedProyectos[proyecto.codProyecto!];
    if (proyecto.fechaInicio!.length !== undefined) {
      let fechaI = new Date(proyecto.fechaInicio!);
      fechaI.setDate(fechaI.getDate() + 1);
      proyecto.fechaInicio = fechaI.toISOString();
    }
    if (proyecto.fechaFinalizacion!.length !== undefined) {
      let fechaF = new Date(proyecto.fechaFinalizacion!);
      fechaF.setDate(fechaF.getDate() + 1);
      proyecto.fechaFinalizacion = fechaF.toISOString();
    }
    this.pmanagerService.modificarProyecto(proyecto)
      .subscribe((resp) => {
        this.messageService.add(
          { severity: 'success', summary: 'Actualizado', detail: 'Se actualizó el proyecto' }
        );
        this.proyectos.splice(this.proyectos.map(p => p.codProyecto).indexOf(proyecto.codProyecto), 1, resp);
      });
  }

  cancelarCambios(proyecto: Proyecto, index: number) {
    this.proyectos[index] = this.clonedProyectos[proyecto.codProyecto!];
    //delete this.productos[product.codProducto!];
  }

}
