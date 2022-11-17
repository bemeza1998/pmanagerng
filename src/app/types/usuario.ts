import { Perfiles } from "./perfiles";

export type Usuario = {

    codUsuario?: string,
    codJefatura?: number,
    codPerfil?: Perfiles,
    nombre?: string,
    apellido?: string,
    mail?: string,
    estado?: string

};
