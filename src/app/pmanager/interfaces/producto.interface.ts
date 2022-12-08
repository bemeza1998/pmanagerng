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
    cronograma: boolean,
    entregadoQa: number,
    qaErroresReportados?: number,
    qaErroesCorregidos?: number,
    qaProductosAprobados?: number,
    qaProductosRechazados?: number,
    qaObservaciones?: string,
    qaEstado?: string,
    estadoSolicitudModificacion: string,
    fechaSolicitudModificacion?: string,
    comentarioSolicitudModificacion?: string,
    proyecto?: Proyecto,
    nombreUsuarioCompleto?: string
}