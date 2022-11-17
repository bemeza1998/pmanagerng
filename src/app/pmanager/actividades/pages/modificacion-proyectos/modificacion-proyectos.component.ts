import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { PmanagerService } from 'src/app/pmanager/services/pmanager.service';
import { Proyecto } from '../../../interfaces/proyecto.interface';

@Component({
  selector: 'app-modificacion-proyectos',
  templateUrl: './modificacion-proyectos.component.html',
  styles: [
  ],
  providers: [ConfirmationService, MessageService]
})
export class ModificacionProyectosComponent implements OnInit {

  proyectos: Proyecto[] = [];
  msgs: Message[] = [];

  estadoSolicitudMap = {
    'SOL': 'Solicitado para editar',
    'SEL': 'Solicitado para eliminar',
    'APR': 'Aprobado para editar',
    'APE': 'Aprobado para eliminar',
    'NEG': 'Negado para editar',
    'NGE': 'Negado para eliminar',
  }


  constructor(private pmanagerService: PmanagerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerProyectos();
  }

  obtenerProyectos() {
    this.pmanagerService.obtenerProyectosEstadoModificacion()
      .subscribe((proyectos) => {
        this.proyectos = proyectos;
      })
  }

  aprobar(proyecto: Proyecto, estado: string) {
    const palabras = {
      accion: (estado === 'SOL' ? 'modificación' : 'eliminación'),
      estado: (estado === 'SOL' ? 'APR' : 'APE'),
    }
    this.confirmationService.confirm({
      message: `Aprobar la ${palabras.accion} del proyecto ${proyecto.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        proyecto.estadoSolicitudModificacion = palabras.estado;
        this.pmanagerService.modificarEstadoSolicitudProyecto(proyecto)
          .subscribe((resp) => {
            proyecto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.proyectos = this.proyectos.filter((item) => item !== proyecto);
        this.messageService.add({ severity: 'info', summary: 'Aprobado', detail: `Se ha aprobado la ${palabras.accion}.` });
      }
    });

  }

  rechazar(proyecto: Proyecto, estado: string) {
    const palabras = {
      accion: (estado === 'SOL' ? 'modificación' : 'eliminación'),
      estado: (estado === 'SOL' ? 'NEG' : 'NGE')
    }
    this.confirmationService.confirm({
      message: `Negar la ${palabras.accion} del proyecto ${proyecto.nombre}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        proyecto.estadoSolicitudModificacion = palabras.estado;
        this.pmanagerService.modificarEstadoSolicitudProyecto(proyecto)
          .subscribe((resp) => {
            proyecto.estadoSolicitudModificacion = resp.estadoSolicitudModificacion;
          });
        this.proyectos = this.proyectos.filter((item) => item !== proyecto);
        this.messageService.add({ severity: 'error', summary: 'Negado', detail: `Se ha negado la ${palabras.accion}.` });
      }
    });
  }

}
