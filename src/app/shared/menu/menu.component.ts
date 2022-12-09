import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Perfiles, PerfilesRev } from 'src/app/types/perfiles';
import { MainComponent } from '../main/main.component';
import { AutenticacionService } from '../../pmanager/services/autenticacion.service';



@Component({
    selector: 'app-menu',
    template: `
        <p-menubar [model]="model">
            <div class="flex justify-content-between flex-wrap align-items-center">
                <p class="mr-5 font-medium">{{nombre | titlecase}} {{apellido | titlecase}} - {{perfil | titlecase}}</p>
                <button (click)="logout()" pButton type="button" label="Cerrar sesión" icon="pi pi-times"
                class="p-button-text"></button>
            </div>
        </p-menubar>
`
})
export class MenuComponent implements OnInit {

    public model: MenuItem[] = [];
    private perfilPermisos: Map<PerfilesRev, MenuItem[]>;
    private adminItems: MenuItem[];
    private jefeItems: MenuItem[];
    private analistaItems: MenuItem[];
    private calidadItems: MenuItem[];
    private recursoItems: MenuItem[];

    constructor(
        public appMain: MainComponent,
        private autenticacionService: AutenticacionService
    ) {
        this.adminItems = [
            {
                label: 'Gestión de usuarios',
                icon: 'pi pi-fw pi-users',
                routerLink: ['/usuarios']
            },
            {
                label: 'Gestión de perfiles',
                icon: 'pi pi-fw pi-sitemap',
                routerLink: ['/perfiles']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-key',
                routerLink: ['/cambio-clave']
            }
        ];

        this.calidadItems = [
            {
                label: 'Ver productos',
                icon: 'pi pi-fw pi-shopping-bag',
                routerLink: ['/calidad-productos']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-key',
                routerLink: ['/cambio-clave']
            }
        ];

        this.jefeItems = [
            {
                label: 'Solicitudes modificación proyectos',
                icon: 'pi pi-fw pi-book',
                routerLink: ['/modificacion-proyectos']
            },
            {
                label: 'Solicitudes modificación productos',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/modificacion-productos']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-key',
                routerLink: ['/cambio-clave']
            }
        ];

        this.analistaItems = [
            {
                label: 'Gestión de proyectos',
                icon: 'pi pi-fw pi-table',
                routerLink: ['/proyectos']
            },
            {
                label: 'Gestión de empresas',
                icon: 'pi pi-fw pi-building',
                routerLink: ['/empresas']
            },
            {
                label: 'Solicitudes modificación productos',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/modificacion-productos']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-key',
                routerLink: ['/cambio-clave']
            }
        ];

        this.recursoItems = [
            {
                label: 'Mis productos',
                icon: 'pi pi-fw pi-shopping-bag',
                routerLink: ['/productos']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-key',
                routerLink: ['/cambio-clave']
            }
        ];

        this.perfilPermisos = new Map<PerfilesRev, MenuItem[]>();

        this.perfilPermisos.set(PerfilesRev.ADM, this.adminItems);

        this.perfilPermisos.set(PerfilesRev.CAL, this.calidadItems);

        this.perfilPermisos.set(PerfilesRev.ALP, this.analistaItems);

        this.perfilPermisos.set(PerfilesRev.REC, this.recursoItems);

        this.perfilPermisos.set(PerfilesRev.JEF, this.jefeItems);

    }

    nombre: string = '';
    apellido: string = '';
    perfil: string = '';

    ngOnInit(): void {
        const usuario = this.autenticacionService.usuarioAutenticado;
        this.nombre = usuario?.nombre!;
        this.apellido = usuario?.apellido!;
        const userRoles = PerfilesRev;
        const perfil = this.autenticacionService.usuarioAutenticado?.codPerfil! as keyof typeof userRoles
        const userRolesPerfil = Perfiles;
        this.perfil = userRolesPerfil[perfil]!;
        this.model = this.perfilPermisos.get(userRoles[perfil])!;
    }

    logout() {
        this.autenticacionService.cerrarSesion();
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = <HTMLDivElement>event.target;
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }

}
