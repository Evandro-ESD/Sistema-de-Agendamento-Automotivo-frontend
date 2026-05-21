import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AuthResponse } from '../../../../models/user';
@Component({
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  selector: 'app-workshopp-login',
  templateUrl: './login-workshop.component.html',
  // styleUrls: ["./login-workshop.component.css"],
})
export class LoginWorkshopComponent {
  loading = false;
  error = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { email, password } = this.form.getRawValue();

    this.authService.login(email!, password!).subscribe({
      next: (response: AuthResponse) => {
        const user = response.user;

        /**
         * LOGIN OFICINA:
         * apenas admins
         */
        const allowedRoles = ['admin_oficina', 'admin_geral'];

        if (!allowedRoles.includes(user.role)) {
          this.loading = false;

          this.error = 'Esta conta não pertence à área administrativa.';

          this.authService.logout();

          return;
        }

        this.router.navigate(['/comando']);
      },

      error: (err: Error) => {
        this.loading = false;

        this.error = err?.message || 'Erro ao realizar login.';
      },

      complete: () => {
        this.loading = false;
      },
    });
  }

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
}
