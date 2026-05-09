import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

import { HeaderComponent } from '../../shared/componets/header/header.component';

import { HeroComponent } from '../../shared/componets/hero/hero.component';

import { FooterComponent } from '../../shared/componets/footer/footer.component';

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

  errorMsg = '';

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],

    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth
      .login(this.form.value.email!, this.form.value.password!)
      .subscribe({
        next: () => this.router.navigate(['/comando']),

        error: (err) => {
          this.errorMsg = err.error?.detail || 'Erro no login';
        },
      });
  }
}
