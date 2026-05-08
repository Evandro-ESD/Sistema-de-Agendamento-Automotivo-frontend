// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-login',
//   imports: [],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {

// }

import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="container" style="max-width: 400px;">
      <h2>LOGIN</h2>
      <hr />
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div style="margin-bottom: 1rem;">
          <label>Email</label>
          <input type="email" formControlName="email" />
        </div>
        <div style="margin-bottom: 1rem;">
          <label>Senha</label>
          <input type="password" formControlName="password" />
        </div>
        <div *ngIf="errorMsg" class="error">{{ errorMsg }}</div>
        <button type="submit" [disabled]="form.invalid">ENTRAR</button>
        <p style="margin-top: 1rem;">
          Não tem conta? <a routerLink="/register">Registre-se</a>
        </p>
      </form>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.valid) {
      this.auth
        .login(this.form.value.email!, this.form.value.password!)
        .subscribe({
          next: () => this.router.navigate(['/comando']),
          error: (err) =>
            (this.errorMsg = err.error?.detail || 'Erro no login'),
        });
    }
  }
}
