import { Proyecto } from './proyecto.interface';
export interface Producto {

    codProducto?: number,
    codUsuario?: string,
    codJefatura?: number,
    codProyecto: number,
    nombre: string,
    mes: number,
    semana: string,
    fechaEstimadaEntrega: string,
    horasEstimadas: number,
    fechaRealEntrega?: string,
    porcentajeCumplimiento: number,
    cronograma: string,
    observaciones: string,
    entregadoQa: number,
    qaErroresReportados?: number,
    qaErroesCorregidos?: number,
    qaProductosAprobados?: number,
    qaProductosRechazados?: number,
    qaObservaciones?: string,
    estadoSolicitudModificacion: string,
    fechaSolicitudModificacion?: string,
    comentarioSolicitudModificacion?: string,
    proyecto?: Proyecto,
    nombreUsuarioCompleto?: string
}