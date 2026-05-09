/*
import { CommonModule } from '@angular/common';

import { Component, inject } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  Router,
  RouterLink,
} from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

import { HeaderComponent } from '../../shared/components/header/header.component';

import { HeroComponent } from '../../shared/components/hero/hero.component';

import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    HeaderComponent,
    HeroComponent,
    FooterComponent,
  ],

  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  private auth = inject(AuthService);

  private router = inject(Router);

  loading = false;

  errorMsg = '';

  form = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.errorMsg = '';

    const { email, password } =
      this.form.getRawValue();

    this.auth
      .login(email, password)
      .subscribe({
        next: () => {
          this.router.navigate(['/comando']);
        },

        error: (err) => {
          console.error(err);

          if (err.status === 401) {
            this.errorMsg =
              'E-mail ou senha inválidos.';
          }

          else if (err.status === 0) {
            this.errorMsg =
              'Servidor indisponível.';
          }

          else {
            this.errorMsg =
              err.error?.detail ||
              'Erro no login';
          }

          this.loading = false;
        },

        complete: () => {
          this.loading = false;
        },
      });
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }
}
*/

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private fb = inject(FormBuilder);

  private auth = inject(AuthService);

  private router = inject(Router);

  loading = false;

  error = '';

  form = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
      ],
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
      ],
    ],
  });

  // GETTERS
  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.error = '';

    loginAdminGeral() {
  this.form.patchValue({
    email: 'admin@email.com',
    password: 'admin123',
  });
  this.onSubmit();
    }

    const { email, password } =
      this.form.getRawValue();

    this.auth
      .login(email!, password!)
      .subscribe({

        next: (res) => {

          this.loading = false;

          console.log('Usuário logado:', res.user);

          // REDIRECIONAMENTO POR PERFIL

          switch (res.user.role) {

            case 'admin_geral':

              this.router.navigate([
                '/comando/relatorios',
              ]);

              break;

            case 'admin_oficina':

              this.router.navigate([
                '/comando/agendamentos',
              ]);

              break;

            case 'associado':

              this.router.navigate([
                '/comando/agendamentos',
              ]);

              break;

            default:

              this.router.navigate([
                '/comando',
              ]);
          }
        },

        error: (err) => {

          this.loading = false;

          console.error(err);

          this.error =
            'Email ou senha inválidos';
        },
      });
  }

  // LOGIN RÁPIDO PARA TESTES

  loginGerente() {

    this.form.patchValue({
      email: 'gerente123@email.com',
      password: 'gerente123',
    });

    this.onSubmit();
  }

  loginAssociado() {

    this.form.patchValue({
      email: 'associado123@email.com',
      password: 'associado123',
    });

    this.onSubmit();
  }
}
