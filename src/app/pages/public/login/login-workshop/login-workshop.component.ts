import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  selector: 'app-workshopp-login',
  templateUrl: './login-workshop.component.html',
  // styleUrls: ["./login-workshop.component.css"],
})
export class LoginWorkshopComponent {
  expectedRole = 'admin_oficina';
  redirectPath = '/oficina/agendamentos';
  loginTitle = 'Área da Oficina';
  welcomeMessage = 'Acesse o painel da oficina';
  subtitle = 'Gerencie agendamentos, serviços e equipe.';

  loading = false;
  error = '';

  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {}

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
