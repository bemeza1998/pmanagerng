import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../../pmanager/services/autenticacion.service';
import { Login } from '../../../types/login';
import { Usuario } from '../../../pmanager/interfaces/usuario.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup = this.fb.group({
    codUsuario: [, [Validators.required]],
    clave: [, [Validators.required]]
  })

  public loginForm: any;
  public isLoading: boolean = false;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {

  }

  login() {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }
    const { codUsuario, clave } = this.formularioLogin.value;
    this.autenticacionService.login({ codUsuario, clave })
      .subscribe((resp) => {
        if (resp) {
          this.router.navigateByUrl('');
        } else {
          this.showErrorMessage();
        }
      });
  }

  private showErrorMessage() {
    this.messageService.add({
      key: 'tc',
      severity: 'error',
      summary: 'Error',
      detail: 'El nombre de usuario o contraseña son incorrecto(s).',
    });
  }

  campoEsValido(campo: string) {
    return this.formularioLogin.controls[campo].errors &&
      this.formularioLogin.controls[campo].touched
  }




}
