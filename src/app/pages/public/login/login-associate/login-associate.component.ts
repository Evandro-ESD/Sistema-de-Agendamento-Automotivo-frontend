import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-associate',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login-associate.component.html',
  styleUrl: './login-associate.component.css',
})
export class LoginAssociateComponent {
  expectedRole = 'associate';
  redirectPath = '/associate/dashboard';
  loginTitle = 'Login de Associado';
  welcomeMessage = 'Faça seu login';
  subtitle = 'Acesse sua conta para gerenciar seus agendamentos e perfil.';

  loading = false;
  error = '';

  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  onSubmit() {}
}
