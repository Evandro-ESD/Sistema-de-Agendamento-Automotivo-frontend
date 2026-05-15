import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../../../core/services/auth.service';

@Component({
  selector: 'app-login-associate',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './login-associate.component.html',
  styleUrl: './login-associate.component.css',
})
export class LoginAssociateComponent {
  loading = false;
  error = '';

  private authService = inject(AuthService);
  private router = inject(Router);
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

  onSubmit() {
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { email, password } = this.form.getRawValue();

    this.authService.login(email!, password!).subscribe({
      next: (response) => {
        const user = response.user;

        /**
         * LOGIN ASSOCIADO:
         * só permite associado
         */
        if (user.role !== 'associado') {
          this.loading = false;

          this.error = 'Esta conta não pertence à área do associado.';

          this.authService.logout();

          return;
        }

        this.router.navigate(['/comando']);
      },

      error: (err) => {
        this.loading = false;

        this.error = err?.message || 'Erro ao realizar login.';
      },

      complete: () => {
        this.loading = false;
      },
    });
  }
}
