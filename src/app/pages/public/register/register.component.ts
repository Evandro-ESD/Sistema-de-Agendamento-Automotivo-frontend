import { CommonModule } from '@angular/common';

import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  private auth = inject(AuthService);

  private router = inject(Router);

  loading = false;

  errorMsg = '';

  form = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],

    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.errorMsg = '';

    const { nome, email, password } = this.form.getRawValue();

    this.auth.register(nome, email, password).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },

      error: (err) => {
        console.error(err);

        if (err.status === 409) {
          this.errorMsg = 'Usuário já cadastrado.';
        } else if (err.status === 0) {
          this.errorMsg = 'Servidor indisponível.';
        } else {
          this.errorMsg = err.error?.detail || 'Erro no cadastro.';
        }

        this.loading = false;
      },

      complete: () => {
        this.loading = false;
      },
    });
  }

  get nome() {
    return this.form.controls.nome;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }
}
