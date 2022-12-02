import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../../interfaces/producto.interface';
import { PmanagerService } from '../../../services/pmanager.service';
import { Proyecto } from '../../../interfaces/proyecto.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AutenticacionService } from 'src/app/pmanager/services/autenticacion.service';
import { ErrorQA } from 'src/app/pmanager/interfaces/errorQa.inteface';

interface Mes {
  numero: number,
  nombre: string
}

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styles: [`
  .p-inputtext {
      width: 150px !important;
  }
`],
  providers: [ConfirmationService, MessageService]
})
export class GestionProductosComponent implements OnInit {

  @ViewChild('crearFormulario') crearFormulario!: NgForm;

  usuario = this.autenticacionService.usuarioAutenticado;

  productoNuevo: Producto[] = [{
    codUsuario: this.usuario?.codUsuario!,
    codJefatura: 1,
    codProyecto: 0,
    nombre: '',
    semana: this.obtenerSemana('siguiente').toISOString(),
    mes: this.obtenerSemana('siguiente').getMonth() + 1,
    fechaEstimadaEntrega: '',
    horasEstimadas: 0,
    porcentajeCumplimiento: 0,
    cronograma: false,
    observaciones: '',
    entregadoQa: 0,
    estadoSolicitudModificacion: 'NOS',
    proyecto: { nombre: '' },
    nombreUsuarioCompleto: `${this.usuario?.nombre} ${this.usuario?.apellido}`,
  }];

  productoRevision: Producto = {
    codProyecto: 0,
    nombre: '',
    mes: 0,
    semana: '',
    fechaEstimadaEntrega: '',
    horasEstimadas: 0,
    porcentajeCumplimiento: 0,
    cronograma: false,
    observaciones: '',
    entregadoQa: 0,
    estadoSolicitudModificacion: ''
  };

  productos: Producto[] = [];
  proyectos: Proyecto[] = [];
  proyectoSeleccionado!: Proyecto;
  comentarioSolicitudModificacion: string = '';
  displayLoad: boolean = false;
  erroresReportados: ErrorQA[] = [];

  meses: Mes[] = this.incializarMeses();
  semanas: string[] = [];
  semanasModificar: string[] = [];
  proyectoFiltro: number = 0;
  nombreProducto: string = '';
  porcentajeCumplimiento!: number;
  mesSeleccionado!: number;
  semanaSeleccionada: string = '';
  valorAnterior: number = 0;
  accion: string = 'SOL';
  fechaEntregaMin: Date = new Date(this.obtenerSemana('anterior'));
  fechaEntregaMax: Date = new Date(this.obtenerSemana('siguiente'));

  estadoSolicitudMap = {
    'SOL': 'Solicitado para editar',
    'SEL': 'Solicitado para eliminar',
    'APR': 'Aprobado para editar',
    'APE': 'Aprobado para eliminar',
    'NEG': 'Negado para editar',
    'NGE': 'Negado para eliminar',
    'NOS': 'No solicitado'
  }

  qaEstadosMap = {
    'PRQ': 'Por revisar',
    'APQ': 'Aprobado por QA',
    'REQ': 'Rechazado por QA'
  }

  qaEstadosErrorMap = {
    'COR': 'Corregido',
    'PCO': 'Por corregir'
  }

  constructor(private pmanagerService: PmanagerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private autenticacionService: AutenticacionService
  ) { }

  seleccionarProyecto(producto: Producto) {
    let proyectoSeleccionado = this.proyectos.find((proyecto) => proyecto.codProyecto === producto.codProyecto)
    producto.proyecto = proyectoSeleccionado;
  }

  ngOnInit(): void {
    this.obtenerProyectos();
    this.obtenerProductos();
  }

  guardarProducto() {
    this.pmanagerService.crearProducto(this.productoNuevo[0])
      .subscribe(() => {
        this.crearFormulario.reset();
        this.obtenerProductos();
      });

  }

  obtenerProyectos() {
    this.pmanagerService.obtenerPorJefatura(1)
      .subscribe((proyectos) => {
        this.proyectos = proyectos;
      });
  }

  obtenerProductos() {
    this.pmanagerService.obtenerProductos(this.usuario?.codUsuario!)
      .subscribe((productos) => {
        this.productos = productos;
      })
  }

  solicitarEstado(producto: Producto) {

    this.confirmationService.confirm({
      message: `<p>Solicitar la modificación del producto ${producto.nombre}?</p>
                `,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        producto.estadoSolicitudModificacion = this.accion;
        producto.comentarioSolicitudModificacion = this.comentarioSolicitudModificacion;
        this.pmanagerService.solicitarModificacion(producto)
          .subscribe((resp) => {
            producto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.messageService.add({ severity: 'info', summary: 'Solicitud exitosa', detail: `Se ha solicitado la modificación.` });
        this.comentarioSolicitudModificacion = '';
      },
      reject: () => {
        this.comentarioSolicitudModificacion = '';
      }
    });
  }

  solicitarCambio(producto: Producto) {
    return (producto.estadoSolicitudModificacion === 'NOS'
      || producto.estadoSolicitudModificacion === 'NGE'
      || producto.estadoSolicitudModificacion === 'NEG');
  }

  cancelarSolicitud(producto: Producto) {
    this.confirmationService.confirm({
      message: `¿ Está seguro de cancelar la solicitud ?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        producto.estadoSolicitudModificacion = 'NOS';
        producto.comentarioSolicitudModificacion = '';
        this.pmanagerService.solicitarModificacion(producto)
          .subscribe((resp) => {
            producto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.messageService.add({ severity: 'info', summary: 'Solicitud exitosa', detail: `Se ha cancelado la solicitud.` });
        this.comentarioSolicitudModificacion = '';
      },
      key: 'cancelarSolicitud'
    });
  }

  eliminar(producto: Producto) {
    this.confirmationService.confirm({
      message: `¿ Está seguro de eliminar el producto ?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        producto.estadoSolicitudModificacion = 'ELI';
        this.pmanagerService.solicitarModificacion(producto)
          .subscribe((resp) => {
            producto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.productos.splice(this.productos.map(p => p.codProducto).indexOf(producto.codProducto), 1);
        this.messageService.add({ severity: 'info', summary: 'Eliminación exitosa', detail: `Se ha eliminado el producto.` });
      },
      key: 'cancelarSolicitud'
    });
  }

  verificarCumplimiento(producto: Producto, index: number) {
    if (this.valorAnterior !== producto.porcentajeCumplimiento) {
      this.pmanagerService.modificarPorcentajeCumplimiento(producto, this.usuario?.codUsuario!)
        .subscribe((resp) => {
          this.productos[this.productos.map(p => p.codProducto).indexOf(producto.codProducto)] = resp;
        });
    }
  }

  capturarAnterior(producto: Producto) {
    this.valorAnterior = producto.porcentajeCumplimiento;
  }

  cambiarCronograma(producto: Producto) {
    this.pmanagerService.modificarCronograma(producto)
      .subscribe((resp) => {
        if (resp) {
          producto.cronograma = resp.cronograma;
        }
      });
  }

  cambiarObservaciones(producto: Producto) {
    this.pmanagerService.modificarObservaciones(producto)
      .subscribe((resp) => {
        if (resp) {
          producto.observaciones = resp.observaciones;
        }
      })
  }

  consultar() {
    this.pmanagerService.obtenerProductosPorFiltro(
      this.proyectoFiltro ?? '',
      '',
      this.porcentajeCumplimiento ?? '',
      this.semanaSeleccionada,
      this.nombreProducto
    )
      .subscribe((productos) => {
        this.productos = productos;
      });
  }

  clonedProducts: { [s: number]: Producto; } = {};

  editar(producto: Producto) {
    this.llenarSemanasModificacionProducto();
    this.clonedProducts[producto.codProducto!] = { ...producto };
  }


  guardarCambios(producto: Producto) {
    delete this.clonedProducts[producto.codProducto!];
    if (producto.nombre.trim().length === 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'El nombre del producto es obligatorio.' });
      return;
    }
    else if (producto.fechaEstimadaEntrega === null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'La fecha estimada del producto es obligatoria.' });
      return;
    }
    else if (producto.horasEstimadas === null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Las horas estimadas del producto son obligatorias.' });
      return;
    }
    this.pmanagerService.modificarProducto(producto)
      .subscribe((resp) => {
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Se actualizó el producto' });
        this.productos.splice(this.productos.map(p => p.codProducto).indexOf(producto.codProducto), 1, resp);
      });
  }

  campoValido(campo: string): boolean {
    return this.crearFormulario?.controls[campo]?.invalid
      && this.crearFormulario?.controls[campo]?.touched
  }

  showLoadDialog(producto: Producto) {
    this.productoRevision = { ...producto };
    this.displayLoad = true;
    this.pmanagerService.obtenerErroresProducto(this.productoRevision.codProducto!)
      .subscribe((errores) => {
        this.erroresReportados = errores;
      })
  }

  cancelarCambios(product: Producto, index: number) {
    this.productos[index] = this.clonedProducts[product.codProducto!];
    //delete this.productos[product.codProducto!];
  }

  obtenerSemana(avance: string) {
    let suma = avance === 'siguiente' ? 1 : -1;
    let fecha = new Date();
    let day = new Date().getDay();
    if (suma === -1) {
      fecha.setDate(fecha.getDate() + suma);
      day = fecha.getDay();
    }
    while (true) {
      if (day === 4) {
        return fecha;
      }
      fecha.setDate(fecha.getDate() + suma);
      day = fecha.getDay();
    }
  }

  llenarSemanas() {
    this.semanas = [];
    let fecha = new Date(new Date().getFullYear(), this.mesSeleccionado - 1);
    let dia = fecha.getDay();
    let diaMax: number = new Date(2022, this.mesSeleccionado, 0).getDate();
    for (let i = 1; i <= diaMax; i++) {
      if (dia === 4) {
        this.semanas.push(`${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`);
      }
      fecha.setDate(fecha.getDate() + 1);
      dia = fecha.getDay();
    }
  }

  llenarSemanasModificacionProducto() {
    this.semanasModificar = [];
    let fecha = new Date();
    let semanaActual = new Date();
    let dia = fecha.getDay();
    while (this.semanasModificar.length === 0) {
      if (dia === 4) {
        this.semanasModificar.push(this.estructurarFecha(fecha));
      }
      semanaActual = new Date(fecha.toISOString());
      fecha.setDate(fecha.getDate() + 1);
      dia = fecha.getDay();
    }
    while (this.semanasModificar.length < 3) {
      if (dia === 4) {
        this.semanasModificar.push(this.estructurarFecha(fecha));
      }
      fecha.setDate(fecha.getDate() + 1);
      dia = fecha.getDay();
    }
    while (this.semanasModificar.length < 5) {
      if (dia === 4) {
        this.semanasModificar.unshift(this.estructurarFecha(semanaActual));
      }
      semanaActual.setDate(semanaActual.getDate() - 1);
      dia = semanaActual.getDay();
    }
  }

  private estructurarFecha(fecha: Date) {
    let diaAgregar = fecha.getDate() < 10 ? `0${fecha.getDate().toString()}` : fecha.getDate().toString();
    let mesAgregar = fecha.getMonth() < 10 ? `0${(fecha.getMonth() + 1).toString()}` : (fecha.getMonth() + 1).toString();
    return `${diaAgregar}-${mesAgregar}-${fecha.getFullYear()}`;
  }

  incializarMeses(): Mes[] {
    return [
      {
        numero: 1, nombre: 'Enero'
      },
      {
        numero: 2, nombre: 'Febrero'
      },
      {
        numero: 3, nombre: 'Marzo'
      },
      {
        numero: 4, nombre: 'Abril'
      },
      {
        numero: 5, nombre: 'Mayo'
      },
      {
        numero: 6, nombre: 'Junio'
      },
      {
        numero: 7, nombre: 'Julio'
      },
      {
        numero: 8, nombre: 'Agosto'
      },
      {
        numero: 9, nombre: 'Septiembre'
      },
      {
        numero: 10, nombre: 'Octubre'
      },
      {
        numero: 11, nombre: 'Noviembre'
      },
      {
        numero: 12, nombre: 'Diciembre'
      },
    ]
  }

}
