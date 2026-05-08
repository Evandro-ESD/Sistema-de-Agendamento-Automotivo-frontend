// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   imports: [],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {

// }
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="container" style="max-width: 400px;">
      <h2>CADASTRO (ASSOCIADO)</h2>
      <hr />
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <div><label>Nome</label><input formControlName="nome" /></div>
        <div>
          <label>Email</label><input type="email" formControlName="email" />
        </div>
        <div>
          <label>Senha</label
          ><input type="password" formControlName="password" />
        </div>
        <div *ngIf="errorMsg" class="error">{{ errorMsg }}</div>
        <button type="submit">REGISTRAR</button>
      </form>
    </div>
  `,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  errorMsg = '';

  form = this.fb.group({
    nome: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.minLength(6)],
  });

  onSubmit() {
    if (this.form.valid) {
      this.auth
        .register(
          this.form.value.nome!,
          this.form.value.email!,
          this.form.value.password!,
        )
        .subscribe({
          next: () => this.router.navigate(['/login']),
          error: (err) =>
            (this.errorMsg = err.error?.detail || 'Erro no cadastro'),
        });
    }
  }
}
