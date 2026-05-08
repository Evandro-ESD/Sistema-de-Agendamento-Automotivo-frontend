import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../models/user';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: UserRole[]) => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (allowedRoles.includes(user.role)) return true;
    return router.parseUrl('/comando'); // redireciona para área principal (sem acesso)
  };
};
