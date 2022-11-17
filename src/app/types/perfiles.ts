export enum Perfiles {
  ADMINISTRADOR = 'ADM',
  JEFE_DEPARTAMENTO = 'JEF',
  ANALISTA = 'ALP',
  CALIDAD = 'CAL',
  RECURSO = 'REC'
}

export const UserRoleNames: Record<Perfiles, string> = {
  ADM: 'Administrador',
  JEF: 'Jefe de departamento',
  ALP: 'Analista de proyectos',
  CAL: 'Calidad',
  REC: 'Recurso'
};
