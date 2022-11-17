import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Producto } from 'src/app/pmanager/interfaces/producto.interface';
import { Proyecto } from 'src/app/pmanager/interfaces/proyecto.interface';
import { PmanagerService } from '../../../services/pmanager.service';

interface Mes {
  numero: number,
  nombre: string
}

@Component({
  selector: 'app-calidad-productos',
  templateUrl: './calidad-productos.component.html',
  styles: [
  ],
  providers: [MessageService]
})
export class CalidadProductosComponent implements OnInit {

  productos: Producto[] = [];
  proyectos: Proyecto[] = [];
  proyectoSeleccionado: number = 0;
  nombreCreador: string = '';
  meses: Mes[] = this.incializarMeses();
  mesSeleccionado!: number;
  semanas: string[] = [];
  semanaSeleccionada: string = '';
  porcentajeCumplimiento!: number;

  constructor(
    private pmanagerService: PmanagerService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
    this.pmanagerService.obtenerPorJefatura(1)
      .subscribe((proyectos) => {
        this.proyectos = proyectos;
      });
  }

  obtenerProductos() {
    this.pmanagerService.obtenerProductosTodos()
      .subscribe((productos) => {
        this.productos = productos;
      })
  }

  llenarSemanas() {
    this.semanas = [];
    let fecha = new Date(2022, this.mesSeleccionado - 1);
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

  obtenerSemana() {
    let fecha = new Date();
    let day = new Date().getDay();
    while (true) {
      if (day === 4) {
        //console.log(fecha.toDateString())
        return fecha;
      }
      fecha.setDate(fecha.getDate() - 1);
      day = fecha.getDay();
    }
  }

  consultar() {
    this.pmanagerService.obtenerProductosPorFiltro(
      this.proyectoSeleccionado ?? '',
      this.nombreCreador,
      this.porcentajeCumplimiento ?? '',
      this.semanaSeleccionada,
      ''
    )
      .subscribe((productos) => {
        console.log(productos)
        this.productos = productos;
      });
  }

  datosCalidad(producto: Producto) {
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
    //if (product.price > 0) {
    delete this.clonedProducts[producto.codProducto!];
    this.pmanagerService.modificarProductoQA(producto)
      .subscribe((resp) => {
        this.messageService.add(
          { severity: 'success', summary: 'Actualizado', detail: 'Se actualizó el producto' }
        );
      });

    //this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    //}  
    //else {
    //this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    //}
  }

  cancelarCambios(producto: Producto, index: number) {
    this.productos[index] = this.clonedProducts[producto.codProducto!];
    //delete this.productos[product.codProducto!];
  }

}
