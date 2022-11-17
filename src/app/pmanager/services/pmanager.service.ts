import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';
import { Proyecto } from '../interfaces/proyecto.interface';
import { Producto } from '../interfaces/producto.interface';
import { Perfil } from '../interfaces/perfil.interface';

const URL: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PmanagerService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios(estado: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${URL}/usuario/estado/${estado}`);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${URL}/usuario`, usuario);
  }

  obtenerPorJefatura(codJefatura: number): Observable<Proyecto[]> {
    const params: HttpParams = new HttpParams()
      .set("codJefatura", codJefatura);
    return this.http.get<Proyecto[]>(`${URL}/proyecto`, { params });
  }

  obtenerProyectosEstadoModificacion(): Observable<Proyecto[]> {
    return this.http.get<Proyecto[]>(`${URL}/proyecto/estado`);
  }

  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${URL}/proyecto`, proyecto);
  }

  modificarEstadoSolicitudProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.patch<Proyecto>(`${URL}/proyecto`, proyecto);
  }

  modificarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.put<Proyecto>(`${URL}/proyecto`, proyecto);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${URL}/producto`, producto);
  }

  modificarProducto(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${URL}/producto`, producto);
  }

  modificarProductoQA(producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${URL}/producto/qa`, producto);
  }

  modificarPorcentajeCumplimiento(producto: Producto): Observable<Producto> {
    return this.http.patch<Producto>(`${URL}/producto/porcentaje`, producto);
  }

  obtenerProductos(codUsuario: string): Observable<Producto[]> {
    const params: HttpParams = new HttpParams()
      .set("codUsuario", codUsuario);
    return this.http.get<Producto[]>(`${URL}/producto`, { params });
  }

  obtenerProductosTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${URL}/producto/todos`);
  }

  eliminarProducto(producto: Producto): Observable<any> {
    const params: HttpParams = new HttpParams()
      .set("codUsuario", producto.codUsuario!)
      .set("codProducto", producto.codProducto!);
    return this.http.delete<any>(`${URL}/producto/eliminar`, { params });
  }

  obtenerPorEstadoModificacion(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${URL}/producto/estado`);
  }

  solicitarModificacion(producto: Producto): Observable<Producto> {
    return this.http.patch<Producto>(`${URL}/producto`, producto);
  }

  obtenerProductosPorFiltro(codProyecto: number, nombreCreador: string, porcentaje: number, semana: string, nombreProducto: string): Observable<Producto[]> {
    const params: HttpParams = new HttpParams()
      .set("codProyecto", codProyecto)
      .set("nombreCreador", nombreCreador)
      .set("porcentaje", porcentaje)
      .set("semana", semana)
      .set("nombreProducto", nombreProducto);
    return this.http.get<Producto[]>(`${URL}/producto/filtro`, { params });
  }

  crearPerfil(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(`${URL}/perfil`, perfil);
  }

  obtenerPerfiles(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${URL}/perfil`);
  }

  modificarPerfil(perfil: Perfil): Observable<Perfil> {
    console.log(perfil);
    return this.http.put<Perfil>(`${URL}/perfil`, perfil);
  }

  eliminarPerfil(perfil: Perfil): Observable<any> {
    return this.http.patch<any>(`${URL}/perfil`, perfil);
  }

}
