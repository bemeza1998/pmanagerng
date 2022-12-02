export interface Proyecto {

    codProyecto?: number,
    identificadorProyecto?: string,
    codUsuario?: string,
    codJefatura?: number,
    nombre: string,
    descripcion?: string,
    estado?: string,
    valorEntrega?: number,
    diasContrato?: number,
    valorDia?: number,
    valorHora?: number,
    fechaInicio?: string,
    fechaFinalizacion?: string,
    estadoSolicitudModificacion?: string,
    fechaSolicitudModificacion?: string,
    comentarioSolicitudModificacion?: string,
    nombreUsuarioCompleto?: string,
    codEmpresa?: number,
    nombreEmpresa?: string
}