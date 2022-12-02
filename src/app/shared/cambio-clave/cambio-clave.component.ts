import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { PmanagerService } from '../../pmanager/services/pmanager.service';
import { AutenticacionService } from '../../pmanager/services/autenticacion.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styles: [
  ]
})
export class CambioClaveComponent implements OnInit {

  formCambioClave: FormGroup = this.fb.group({
    claveAnterior: [, [Validators.required]],
    claveNueva: [, [Validators.required]],
    claveRepetir: [, [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private pmanagerService: PmanagerService,
    private autenticacionService: AutenticacionService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  cambiarClave() {
    if (this.formCambioClave.controls['claveNueva'].value !== this.formCambioClave.controls['claveRepetir'].value) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Las contraseñas no coinciden.` });
      return;
    }
    this.pmanagerService.cambiarClave(
      this.autenticacionService.usuarioAutenticado?.codUsuario!,
      this.formCambioClave.controls['claveAnterior'].value,
      this.formCambioClave.controls['claveNueva'].value
    ).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Cambio exitoso', detail: `La contraseña se ha cambiado exitosiamente.` });
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
      }
    })
  }

  campoEsValido(campo: string) { }

}
