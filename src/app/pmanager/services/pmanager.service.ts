import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario.interface';
import { Proyecto } from '../interfaces/proyecto.interface';
import { Producto } from '../interfaces/producto.interface';
import { Perfil } from '../interfaces/perfil.interface';
import { Jefatura } from '../interfaces/jefatura.interface';
import { ErrorQA } from '../interfaces/errorQa.inteface';
import { Empresa } from '../interfaces/empresa.interface';
import { Observacion } from '../interfaces/observacion.interface';

const URL: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class PmanagerService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios(estado: string): Observable<Usuario[]> {
    const headers = this.obtenerHeader();
    return this.http.get<Usuario[]>(`${URL}/usuario/estado/${estado}`, { headers });
  }

  obtenerUsuariosPerfil(perfil: string): Observable<Usuario[]> {
    const headers = this.obtenerHeader();
    return this.http.get<Usuario[]>(`${URL}/usuario/perfil/${perfil}`, { headers });
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = this.obtenerHeader();
    return this.http.post<Usuario>(`${URL}/usuario`, usuario, { headers });
  }

  modificarUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = this.obtenerHeader();
    return this.http.put<Usuario>(`${URL}/usuario`, usuario, { headers });
  }

  cambiarClave(codUsuario: string, claveAntigua: string, claveNueva: string): Observable<any> {
    const headers = this.obtenerHeader();
    return this.http.patch<any>(`${URL}/usuario/cambioclave/${codUsuario}/${claveAntigua}/${claveNueva}`, { headers });
  }

  modificarEstadoUsuario(usuario: Usuario): Observable<Usuario> {
    const headers = this.obtenerHeader();
    return this.http.patch<Usuario>(`${URL}/usuario/estado`, usuario, { headers });
  }

  obtenerPorJefatura(codJefatura: number): Observable<Proyecto[]> {
    const headers = this.obtenerHeader();
    const params: HttpParams = new HttpParams()
      .set("codJefatura", codJefatura);
    return this.http.get<Proyecto[]>(`${URL}/proyecto`, { params, headers });
  }

  obtenerProyectosEstadoModificacion(): Observable<Proyecto[]> {
    const headers = this.obtenerHeader();
    return this.http.get<Proyecto[]>(`${URL}/proyecto/estado`, { headers });
  }

  crearProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const headers = this.obtenerHeader();
    return this.http.post<Proyecto>(`${URL}/proyecto`, proyecto, { headers });
  }

  modificarEstadoSolicitudProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const headers = this.obtenerHeader();
    return this.http.patch<Proyecto>(`${URL}/proyecto`, proyecto, { headers });
  }

  modificarProyecto(proyecto: Proyecto): Observable<Proyecto> {
    const headers = this.obtenerHeader();
    return this.http.put<Proyecto>(`${URL}/proyecto`, proyecto, { headers });
  }

  crearProducto(producto: Producto): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.post<Producto>(`${URL}/producto`, producto, { headers });
  }

  modificarProducto(producto: Producto): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.put<Producto>(`${URL}/producto`, producto, { headers });
  }

  modificarProductoQA(producto: Producto): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.put<Producto>(`${URL}/producto/qa`, producto, { headers });
  }

  modificarPorcentajeCumplimiento(producto: Producto, codUsuario: string): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.patch<Producto>(`${URL}/producto/porcentaje/${codUsuario}`, producto, { headers });
  }

  modificarCronograma(producto: Producto): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.patch<Producto>(`${URL}/producto/cronograma`, producto, { headers });
  }

  modificarObservaciones(producto: Producto): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.patch<Producto>(`${URL}/producto/observaciones`, producto, { headers });
  }

  obtenerProductos(codUsuario: string): Observable<Producto[]> {
    const headers = this.obtenerHeader();
    const params: HttpParams = new HttpParams()
      .set("codUsuario", codUsuario);
    return this.http.get<Producto[]>(`${URL}/producto`, { params, headers });
  }

  obtenerProductosTodos(semana: string): Observable<Producto[]> {
    const headers = this.obtenerHeader();
    const params: HttpParams = new HttpParams()
      .set("semana", semana);
    return this.http.get<Producto[]>(`${URL}/producto/todos`, { params, headers });
  }

  obtenerProductoQA(codUsuario: string, codProducto: number): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.get<Producto>(`${URL}/producto/productoqa/${codUsuario}/${codProducto}`, { headers });
  }

  eliminarProducto(producto: Producto): Observable<any> {
    const headers = this.obtenerHeader();
    const params: HttpParams = new HttpParams()
      .set("codUsuario", producto.codUsuario!)
      .set("codProducto", producto.codProducto!);
    return this.http.delete<any>(`${URL}/producto/eliminar`, { params, headers });
  }

  obtenerPorEstadoModificacion(): Observable<Producto[]> {
    const headers = this.obtenerHeader();
    return this.http.get<Producto[]>(`${URL}/producto/estado`, { headers });
  }

  solicitarModificacion(producto: Producto): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.patch<Producto>(`${URL}/producto`, producto, { headers });
  }

  modificarObservacionQA(producto: Producto): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.patch<Producto>(`${URL}/producto/observacionqa`, producto, { headers });
  }

  modificarEstadoQA(producto: Producto): Observable<Producto> {
    const headers = this.obtenerHeader();
    return this.http.patch<Producto>(`${URL}/producto/estadoqa`, producto, { headers });
  }

  obtenerProductosPorFiltro(codProyecto: number, nombreCreador: string, porcentaje: number, mes: number, semana: string, nombreProducto: string, estadoQa: string): Observable<Producto[]> {
    const headers = this.obtenerHeader();
    const params: HttpParams = new HttpParams()
      .set("codProyecto", codProyecto)
      .set("nombreCreador", nombreCreador)
      .set("porcentaje", porcentaje)
      .set("mes", mes)
      .set("semana", semana)
      .set("nombreProducto", nombreProducto)
      .set("estadoQa", estadoQa);
    return this.http.get<Producto[]>(`${URL}/producto/filtro`, { params, headers });
  }

  crearPerfil(perfil: Perfil): Observable<Perfil> {
    const headers = this.obtenerHeader();
    return this.http.post<Perfil>(`${URL}/perfil`, perfil, { headers });
  }

  obtenerPerfiles(): Observable<Perfil[]> {
    const headers = this.obtenerHeader();
    return this.http.get<Perfil[]>(`${URL}/perfil`, { headers });
  }

  modificarPerfil(perfil: Perfil): Observable<Perfil> {
    const headers = this.obtenerHeader();
    return this.http.put<Perfil>(`${URL}/perfil`, perfil, { headers });
  }

  eliminarPerfil(perfil: Perfil): Observable<any> {
    const headers = this.obtenerHeader();
    return this.http.patch<any>(`${URL}/perfil`, perfil, { headers });
  }

  crearJefatura(jefatura: Jefatura): Observable<Jefatura> {
    const headers = this.obtenerHeader();
    return this.http.post<Jefatura>(`${URL}/jefatura`, jefatura, { headers });
  }

  obtenerJefaturas(): Observable<Jefatura[]> {
    const headers = this.obtenerHeader();
    return this.http.get<Jefatura[]>(`${URL}/jefatura`, { headers });
  }

  modificarJefatura(jefatura: Jefatura): Observable<Jefatura> {
    const headers = this.obtenerHeader();
    return this.http.put<Jefatura>(`${URL}/jefatura`, jefatura, { headers });
  }

  eliminarJefatura(jefatura: Jefatura): Observable<any> {
    const headers = this.obtenerHeader();
    return this.http.delete<any>(`${URL}/jefatura/eliminar/${jefatura.codJefatura}`, { headers });
  }

  obtenerErroresProducto(codProducto: number): Observable<ErrorQA[]> {
    const headers = this.obtenerHeader();
    return this.http.get<ErrorQA[]>(`${URL}/errorqa/${codProducto}`, { headers });
  }

  crearErrorProducto(error: ErrorQA): Observable<ErrorQA> {
    const headers = this.obtenerHeader();
    return this.http.post<ErrorQA>(`${URL}/errorqa`, error, { headers });
  }

  cambiarEstadoError(codError: ErrorQA): Observable<ErrorQA> {
    const headers = this.obtenerHeader();
    return this.http.patch<ErrorQA>(`${URL}/errorqa/estado`, codError, { headers });
  }

  eliminarError(codError: number): Observable<any> {
    const headers = this.obtenerHeader();
    return this.http.delete<any>(`${URL}/errorqa/eliminar/${codError}`, { headers });
  }

  crearEmpresa(empresa: Empresa): Observable<Empresa> {
    const headers = this.obtenerHeader();
    return this.http.post<Empresa>(`${URL}/empresa`, empresa, { headers });
  }

  obtenerEmpresas(clienteActivo: string): Observable<Empresa[]> {
    const headers = this.obtenerHeader();
    return this.http.get<Empresa[]>(`${URL}/empresa/estado/${clienteActivo}`, { headers });
  }

  modificarEmpresa(empresa: Empresa): Observable<Empresa> {
    const headers = this.obtenerHeader();
    return this.http.put<Empresa>(`${URL}/empresa`, empresa, { headers });
  }

  modificarClienteActivoEmpresa(empresa: Empresa): Observable<Empresa> {
    const headers = this.obtenerHeader();
    return this.http.patch<Empresa>(`${URL}/empresa`, empresa, { headers });
  }

  obtenerObservaciones(codProducto: number): Observable<Observacion[]> {
    const headers = this.obtenerHeader();
    return this.http.get<Observacion[]>(`${URL}/observacion/${codProducto}`, { headers });
  }

  crearObservacionProducto(observacion: Observacion): Observable<Observacion> {
    const headers = this.obtenerHeader();
    return this.http.post<Observacion>(`${URL}/observacion`, observacion, { headers });
  }

  modificarObservacionProducto(observacion: Observacion): Observable<Observacion> {
    const headers = this.obtenerHeader();
    return this.http.patch<Observacion>(`${URL}/observacion`, observacion, { headers });
  }

  eliminarObservacion(codObservacion: number): Observable<any> {
    const headers = this.obtenerHeader();
    return this.http.delete<any>(`${URL}/observacion/eliminar/${codObservacion}`, { headers });
  }

  private obtenerHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
  }

}
