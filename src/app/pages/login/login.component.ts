
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
