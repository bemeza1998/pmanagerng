import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PerfilesRev } from 'src/app/types/perfiles';
import { MainComponent } from '../main/main.component';
import { AutenticacionService } from '../../pmanager/services/autenticacion.service';



@Component({
    selector: 'app-menu',
    template: `
        <p-menubar [model]="model"></p-menubar>
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
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/usuarios']
            },
            {
                label: 'Gestión de perfiles',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/perfiles']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/cambio-clave']
            }
        ];

        this.calidadItems = [
            {
                label: 'Ver productos',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/calidad-productos']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/cambio-clave']
            }
        ];

        this.jefeItems = [
            {
                label: 'Solicitudes modificación proyectos',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/modificacion-proyectos']
            },
            {
                label: 'Solicitudes modificación productos',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/modificacion-productos']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/cambio-clave']
            }
        ];

        this.analistaItems = [
            {
                label: 'Gestión de proyectos',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/proyectos']
            },
            {
                label: 'Gestión de empresas',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/empresas']
            },
            {
                label: 'Solicitudes modificación productos',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/modificacion-productos']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/cambio-clave']
            }
        ];

        this.recursoItems = [
            {
                label: 'Mis productos',
                icon: 'pi pi-fw pi-sliders-v',
                routerLink: ['/productos']
            },
            {
                label: 'Cambiar contraseña',
                icon: 'pi pi-fw pi-sliders-v',
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

    ngOnInit(): void {
        const userRoles = PerfilesRev;
        const perfil = this.autenticacionService.usuarioAutenticado?.codPerfil! as keyof typeof userRoles
        this.model = this.perfilPermisos.get(userRoles[perfil])!;
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = <HTMLDivElement>event.target;
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }

}
