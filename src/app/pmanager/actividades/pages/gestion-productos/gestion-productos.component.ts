import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../../interfaces/producto.interface';
import { PmanagerService } from '../../../services/pmanager.service';
import { Proyecto } from '../../../interfaces/proyecto.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { AutenticacionService } from 'src/app/pmanager/services/autenticacion.service';

interface Mes {
  numero: number,
  nombre: string
}

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styles: [`
  .p-inputtext {
      *padding-top: 0 !important;
      *padding-bottom: 0 !important;
      width: 150px !important;
  }
  .z-index{
    z-index: 1000 !important;
  }
`],
  providers: [ConfirmationService, MessageService]
})
export class GestionProductosComponent implements OnInit {

  @ViewChild('crearFormulario') crearFormulario!: NgForm;

  usuario = this.autenticacionService.getUserDataFromLocalStorage();

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
    cronograma: '',
    observaciones: '',
    entregadoQa: 0,
    estadoSolicitudModificacion: 'NOS',
    proyecto: { nombre: '' },
    nombreUsuarioCompleto: `${this.usuario?.nombre} ${this.usuario?.apellido}`,
  }];

  productos: Producto[] = [];
  proyectos: Proyecto[] = [];
  proyectoSeleccionado!: Proyecto;
  comentarioSolicitudModificacion: string = '';

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
    console.log(this.fechaEntregaMin)
    console.log(this.fechaEntregaMax)
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
        this.proyectos = this.proyectos.filter((item) => item !== producto);
        this.messageService.add({ severity: 'info', summary: 'Eliminación exitosa', detail: `Se ha eliminado el producto.` });
      },
      key: 'cancelarSolicitud'
    });
  }

  verificarCumplimiento(producto: Producto, index: number) {
    if (this.valorAnterior !== producto.porcentajeCumplimiento) {
      this.pmanagerService.modificarPorcentajeCumplimiento(producto)
        .subscribe((resp) => {
          this.productos[this.productos.map(p => p.codProducto).indexOf(producto.codProducto)] = resp;
        });
    }
    //console.log(index);
    //this.productos[this.productos.map(p => p.codProducto).indexOf(producto.codProducto)].cronograma = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    //console.log(this.productos.map(p => p.codProducto).indexOf(producto.codProducto));
  }

  capturarAnterior(producto: Producto) {
    this.valorAnterior = producto.porcentajeCumplimiento;
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

  editar(product: Producto) {
    this.llenarSemanasModificacionProducto();
    this.clonedProducts[product.codProducto!] = { ...product };
  }


  guardarCambios(producto: Producto) {
    delete this.clonedProducts[producto.codProducto!];
    if (producto.fechaEstimadaEntrega!.length !== undefined) {
      let fechaEst = new Date(producto.fechaEstimadaEntrega!);
      fechaEst.setDate(fechaEst.getDate() + 1);
      producto.fechaEstimadaEntrega = fechaEst.toISOString();
    }
    let sp = producto.semana.split("-");
    producto.semana = new Date(parseInt(sp[2]), parseInt(sp[1]) - 1, parseInt(sp[0])).toISOString();
    this.pmanagerService.modificarProducto(producto)
      .subscribe((resp) => {
        console.log(producto)
        console.log(resp)
        this.messageService.add({ severity: 'success', summary: 'Actualizado', detail: 'Se actualizó el producto' });
        this.productos.splice(this.productos.map(p => p.codProducto).indexOf(producto.codProducto), 1, resp);
      });
  }

  cancelarCambios(product: Producto, index: number) {
    this.productos[index] = this.clonedProducts[product.codProducto!];
    //delete this.productos[product.codProducto!];
  }

  obtenerSemana(avance: string) {
    let suma = avance === 'siguiente' ? 1 : -1;
    let fecha = new Date();
    let day = new Date().getDay();
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
        this.semanasModificar.push(`${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`);
      }
      semanaActual = new Date(fecha.toISOString());
      fecha.setDate(fecha.getDate() + 1);
      dia = fecha.getDay();
    }
    while (this.semanasModificar.length < 3) {
      if (dia === 4) {
        this.semanasModificar.push(`${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`);
      }
      fecha.setDate(fecha.getDate() + 1);
      dia = fecha.getDay();
    }
    while (this.semanasModificar.length < 5) {
      if (dia === 4) {
        this.semanasModificar.unshift(`${semanaActual.getDate()}-${semanaActual.getMonth() + 1}-${semanaActual.getFullYear()}`);
      }
      semanaActual.setDate(semanaActual.getDate() - 1);
      dia = semanaActual.getDay();
    }
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
