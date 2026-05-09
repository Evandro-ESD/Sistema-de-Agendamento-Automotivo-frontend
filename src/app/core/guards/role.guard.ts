/*import { inject } from '@angular/core';
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
*/
/*
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { UserRole } from '../../models/user';
import { AuthService } from '../services/auth.service';

export const roleGuard = (
  allowedRoles: UserRole[]
) => {

  return () => {

    const auth = inject(AuthService);

    const router = inject(Router);

    const user = auth.currentUser();

    if (!user) {
      return router.parseUrl('/login');
    }

    if (
      allowedRoles.includes(user.role)
    ) {
      return true;
    }

    return router.parseUrl('/comando');
  };
};
*/

// role.guard.ts - versão corrigida
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../../models/user';
import { AuthService } from '../services/auth.service';

export const roleGuard = (allowedRoles: UserRole[]) => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const user = auth.currentUser();

    if (!user) {
      return router.parseUrl('/login');
    }

    if (allowedRoles.includes(user.role)) {
      return true;
    }

    // Redireciona baseado no role do usuário
    switch (user.role) {
      case 'admin_geral':
        return router.parseUrl('/comando/relatorios');
      case 'admin_oficina':
        return router.parseUrl('/comando/agendamentos');
      case 'associado':
        return router.parseUrl('/comando/agendamentos');
      default:
        return router.parseUrl('/comando');
    }
  };
};
