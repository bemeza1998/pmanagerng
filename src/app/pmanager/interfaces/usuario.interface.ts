export interface Usuario {
    codUsuario: string,
    codJefatura?: number,
    codPerfil: string,
    nombre: string,
    apellido: string,
    mail: string,
    estado?: string,
    nombreJefatura?: string,
    nombrePerfil?: string,
    nombreCompleto?: string,
    token?: string
}