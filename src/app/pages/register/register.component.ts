import { CommonModule } from '@angular/common';

import { Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

import { HeaderComponent } from '../../shared/components/header/header.component';

import { HeroComponent } from '../../shared/components/hero/hero.component';

import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,

    HeaderComponent,
    HeroComponent,
    FooterComponent,
  ],

  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  private auth = inject(AuthService);

  private router = inject(Router);

  errorMsg = '';

  form = this.fb.group({
    nome: ['', Validators.required],

    email: ['', [Validators.required, Validators.email]],

    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.auth
      .register(
        this.form.value.nome!,
        this.form.value.email!,
        this.form.value.password!,
      )
      .subscribe({
        next: () => this.router.navigate(['/login']),

        error: (err) => {
          this.errorMsg = err.error?.detail || 'Erro no cadastro';
        },
      });
  }
}
