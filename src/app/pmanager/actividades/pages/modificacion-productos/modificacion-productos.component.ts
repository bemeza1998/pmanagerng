import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/producto.interface';
import { PmanagerService } from '../../../services/pmanager.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-modificacion-productos',
  templateUrl: './modificacion-productos.component.html',
  styles: [
  ],
  providers: [ConfirmationService, MessageService]
})
export class ModificacionProductosComponent implements OnInit {

  estadoSolicitudMap = {
    'SOL': 'Solicitado para editar',
    'SEL': 'Solicitado para eliminar',
    'APR': 'Aprobado para editar',
    'APE': 'Aprobado para eliminar',
    'NEG': 'Negado para editar',
    'NGE': 'Negado para eliminar',
  }

  productos: Producto[] = [];
  msgs: Message[] = [];

  constructor(private pmanagerService: PmanagerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.pmanagerService.obtenerPorEstadoModificacion()
      .subscribe((productos) => {
        this.productos = productos;
      })
  }

  aprobar(producto: Producto, estado: string) {
    const palabras = {
      accion: (estado === 'SOL' ? 'modificación' : 'eliminación'),
      estado: (estado === 'SOL' ? 'APR' : 'APE'),
    }
    this.confirmationService.confirm({
      message: `Aprobar la ${palabras.accion} del producto ${producto.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        producto.estadoSolicitudModificacion = palabras.estado;
        this.pmanagerService.solicitarModificacion(producto)
          .subscribe((resp) => {
            producto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.productos = this.productos.filter((item) => item !== producto);
        this.messageService.add({ severity: 'info', summary: 'Aprobado', detail: `Se ha aprobado la ${palabras.accion}.` });
      }
    });

  }

  rechazar(producto: Producto, estado: string) {
    const palabras = {
      accion: (estado === 'SOL' ? 'modificación' : 'eliminación'),
      estado: (estado === 'SOL' ? 'NEG' : 'NGE')
    }
    this.confirmationService.confirm({
      message: `Negar la ${palabras.accion} del producto ${producto.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        producto.estadoSolicitudModificacion = palabras.estado;
        this.pmanagerService.solicitarModificacion(producto)
          .subscribe((resp) => {
            producto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.productos = this.productos.filter((item) => item !== producto);
        this.messageService.add({ severity: 'error', summary: 'Negado', detail: `Se ha negado la ${palabras.accion}.` });
      }
    });
  }

}
