import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/pmanager/interfaces/producto.interface';
import { Proyecto } from 'src/app/pmanager/interfaces/proyecto.interface';
import { PmanagerService } from '../../../services/pmanager.service';
import { ErrorQA } from '../../../interfaces/errorQa.inteface';
import { Usuario } from 'src/app/pmanager/interfaces/usuario.interface';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { Observacion } from 'src/app/pmanager/interfaces/observacion.interface';

interface Mes {
  numero: number,
  nombre: string
}

interface EstadoQa {
  valor: string,
  texto: string
}

@Component({
  selector: 'app-calidad-productos',
  templateUrl: './calidad-productos.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class CalidadProductosComponent implements OnInit {

  displayLoad: boolean = false;
  productos: Producto[] = [];
  proyectos: Proyecto[] = [];
  proyectoSeleccionado: number = 0;
  meses: Mes[] = this.incializarMeses();
  mesSeleccionado!: number;
  semanas: string[] = [];
  semanaSeleccionada: string = '';
  porcentajeCumplimiento!: number;
  valorAnterior: number = 0;
  mostrarObs: boolean = false;
  observacionesProducto: Observacion[] = [];
  estadosQa: EstadoQa[] = [];
  anioSeleccionado: number = new Date().getFullYear();
  anios: number[] = [];

  productoRevision: Producto = {
    codProyecto: 0,
    nombre: '',
    mes: 0,
    semana: '',
    fechaEstimadaEntrega: '',
    horasEstimadas: 0,
    porcentajeCumplimiento: 0,
    cronograma: false,
    entregadoQa: 0,
    estadoSolicitudModificacion: ''
  };
  error: string = '';
  erroresReportados: ErrorQA[] = [];
  usuarios: Usuario[] = [];
  usuarioSeleccionado: string = '';
  estadoQaSeleccionado: string = '';

  qaEstadosMap = {
    'PRQ': 'Por revisar',
    'APQ': 'Aprobado por QA',
    'REQ': 'Rechazado por QA',
    'SLQ': 'Solicitado para revisión QA'
  }

  constructor(
    private pmanagerService: PmanagerService,
    private messageService: MessageService,
    private autenticacionService: AutenticacionService
  ) {
    this.estadosQa = [
      {
        valor: 'PRQ',
        texto: 'Por revisar'
      },
      {
        valor: 'APQ',
        texto: 'Aprobado por QA'
      }, {
        valor: 'REQ',
        texto: 'Rechazado por QA'
      }, {
        valor: 'SLQ',
        texto: 'Solicitado para revisión QA'
      },
    ];
    this.anios = this.incializarAnios();
  }


  ngOnInit(): void {
    this.obtenerProductos(this.obtenerSemana());
    this.obtenerUsuarios();
    this.pmanagerService.obtenerPorJefatura(this.autenticacionService.usuarioAutenticado?.codJefatura!)
      .subscribe((proyectos) => {
        this.proyectos = proyectos;
      });
  }

  obtenerProductos(semana: string) {
    this.pmanagerService.obtenerProductosTodos(semana)
      .subscribe((productos) => {
        this.productos = productos;
      })
  }

  obtenerUsuarios() {
    this.pmanagerService.obtenerUsuariosPerfil('REC')
      .subscribe((usuarios) => {
        usuarios.map((u) => u.nombreCompleto = u.nombre + " " + u.apellido);
        this.usuarios = usuarios;
      });
  }

  mostrarObservaciones(producto: Producto) {
    this.productoRevision = producto;
    this.mostrarObs = true;
    this.pmanagerService.obtenerObservaciones(producto.codProducto!)
      .subscribe({
        next: (observaciones) => {
          this.observacionesProducto = observaciones
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  claseRevisionQA(producto: Producto) {
    return producto.qaEstado === 'APQ' ? 'text-green-400' :
      (producto.qaEstado === 'REQ' ? 'text-red-500' : '');
  }

  limpiarSemanas() {
    this.semanas = [];
  }

  llenarSemanas() {
    if (this.mesSeleccionado === null) {
      return;
    }
    this.semanas = [];
    let fecha = new Date(this.anioSeleccionado, this.mesSeleccionado - 1);
    let dia = fecha.getDay();
    let diaMax: number = new Date(this.anioSeleccionado, this.mesSeleccionado, 0).getDate();
    for (let i = 1; i <= diaMax; i++) {
      if (dia === 4) {
        this.semanas.push(this.estructurarFecha(fecha));
      }
      fecha.setDate(fecha.getDate() + 1);
      dia = fecha.getDay();
    }
  }

  incializarAnios() {
    let fechaActual = new Date().getFullYear();
    return [fechaActual - 1, fechaActual, fechaActual + 1]
  }

  obtenerSemana() {
    let fecha = new Date();
    let dia = new Date().getDay();
    while (true) {
      if (dia === 4) {
        break;
      }
      fecha.setDate(fecha.getDate() + 1);
      dia = fecha.getDay();
    }
    return fecha.toLocaleDateString('es-EC', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  consultar() {
    this.pmanagerService.obtenerProductosPorFiltro(
      this.proyectoSeleccionado ?? '',
      this.usuarioSeleccionado ?? '',
      this.porcentajeCumplimiento ?? '',
      this.mesSeleccionado ?? '',
      this.semanaSeleccionada ?? '',
      '',
      this.estadoQaSeleccionado ?? ''
    ).subscribe((productos) => {
      this.productos = productos;
    });
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

  clonedProducts: { [s: number]: Producto; } = {};

  editar(producto: Producto) {
    this.clonedProducts[producto.codProducto!] = { ...producto };
  }

  guardarCambios(producto: Producto) {
    delete this.clonedProducts[producto.codProducto!];
    this.pmanagerService.modificarProductoQA(producto)
      .subscribe((resp) => {
        this.messageService.add(
          { severity: 'success', summary: 'Actualizado', detail: 'Se actualizó el producto' }
        );
      });
  }

  cancelarCambios(producto: Producto, index: number) {
    this.productos[index] = this.clonedProducts[producto.codProducto!];
  }

  verificarCumplimiento(producto: Producto) {
    if (this.valorAnterior !== producto.porcentajeCumplimiento) {
      this.pmanagerService.modificarPorcentajeCumplimiento(producto, this.autenticacionService.usuarioAutenticado?.codUsuario!)
        .subscribe((resp) => {
          this.productos.splice(this.productos.map(p => p.codProducto).indexOf(resp.codProducto), 1, resp);
          this.productoRevision = { ...resp };
        });
    }
  }

  capturarAnterior(producto: Producto) {
    this.valorAnterior = producto.porcentajeCumplimiento;
  }

  showLoadDialog(producto: Producto): void {
    this.error = '';
    this.productoRevision = { ...producto };
    this.displayLoad = true;
    this.pmanagerService.obtenerErroresProducto(this.productoRevision.codProducto!)
      .subscribe((errores) => {
        this.erroresReportados = errores;
      })
  }

  agregarError() {
    if (this.error.trim().length === 0)
      return;
    const errorQa: ErrorQA = {
      codProducto: this.productoRevision.codProducto!,
      codUsuario: this.productoRevision.codUsuario!,
      errorReportado: this.error,
      estadoError: ''
    }
    this.pmanagerService.crearErrorProducto(errorQa)
      .subscribe((errorqa) => {
        this.erroresReportados.push(errorqa);
        this.error = '';
        this.pmanagerService.obtenerProductoQA(errorqa.codUsuario, errorqa.codProducto)
          .subscribe((producto) => {
            this.productos.splice(this.productos.map(p => p.codProducto).indexOf(producto.codProducto), 1, producto);
            this.productoRevision = { ...producto };
          })
      })
  }

  corregirError(errorQa: ErrorQA) {
    errorQa.estadoError = errorQa.estadoError === 'PCO' ? 'COR' : 'PCO';
    this.pmanagerService.cambiarEstadoError(errorQa)
      .subscribe((error) => {
        this.erroresReportados.splice(this.erroresReportados.map(e => e.codErrorQa).indexOf(errorQa.codErrorQa), 1, error);
        this.pmanagerService.obtenerProductoQA(error.codUsuario, error.codProducto)
          .subscribe((producto) => {
            this.productos.splice(this.productos.map(p => p.codProducto).indexOf(producto.codProducto), 1, producto);
            this.productoRevision = { ...producto };
          })
      })
  }

  guardarObservacion(producto: Producto) {
    this.pmanagerService.modificarObservacionQA(producto)
      .subscribe((resp) => {
        this.productos.splice(this.productos.map(p => p.codProducto).indexOf(producto.codProducto), 1, resp);
        this.productoRevision = { ...resp };
      })
  }

  claseBoton(errorQa: ErrorQA) {
    return errorQa.estadoError === 'PCO' ? 'p-button-danger' : 'p-button-success';
  }

  eliminarError(errorQa: ErrorQA) {
    this.pmanagerService.eliminarError(errorQa.codErrorQa!)
      .subscribe(() => {
        this.erroresReportados.splice(this.erroresReportados.map(e => e.codErrorQa).indexOf(errorQa.codErrorQa), 1);
        this.pmanagerService.obtenerProductoQA(errorQa.codUsuario, errorQa.codProducto)
          .subscribe((producto) => {
            this.productos.splice(this.productos.map(p => p.codProducto).indexOf(producto.codProducto), 1, producto);
            this.productoRevision = { ...producto };
          })
      })
  }

  aprobarProducto(producto: Producto) {
    if (producto.porcentajeCumplimiento != 100) {
      this.messageService.add(
        { severity: 'error', summary: 'Error', detail: 'No se puede aprobar un producto sin el 100% de cumplimiento.' }
      );
      return;
    }
    producto.qaEstado = 'APQ'
    this.pmanagerService.modificarEstadoQA(producto)
      .subscribe((resp) => {
        this.productos.splice(this.productos.map(p => p.codProducto).indexOf(producto.codProducto), 1, resp);
        this.productoRevision = { ...resp };
      })
  }

}
