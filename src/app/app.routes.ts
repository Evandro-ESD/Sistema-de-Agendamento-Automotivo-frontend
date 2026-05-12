import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  /**
   * =========================================
   * PUBLIC LAYOUT
   * =========================================
   */
  {
    path: '',
    loadComponent: () =>
      import('./layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent,
      ),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/public/home/home.component').then(
            (m) => m.HomeComponent,
          ),
      },

      {
        path: 'login',
        loadComponent: () =>
          import('./pages/public/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./pages/public/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
    ],
  },

  /**
   * =========================================
   * PRIVATE LAYOUT
   * =========================================
   */
  {
    path: 'comando',

    canActivate: [authGuard],

    loadComponent: () =>
      import('./pages/dashboard/comando.component').then(
        (m) => m.ComandoComponent,
      ),

    children: [
      /**
       * AGENDAMENTOS
       */
      {
        path: 'agendamentos',

        loadComponent: () =>
          import('./pages/dashboard/agendamentos/agendamento-list/agendamento-list.component').then(
            (m) => m.AgendamentoListComponent,
          ),
      },

      /**
       * OFICINAS
       */
      {
        path: 'oficinas',

        canActivate: [roleGuard(['admin_geral'])],

        loadComponent: () =>
          import('./pages/dashboard/oficinas/oficina-list/oficina-list.component').then(
            (m) => m.OficinaListComponent,
          ),
      },

      /**
       * RELATÓRIOS
       */
      {
        path: 'relatorios',

        canActivate: [roleGuard(['admin_geral', 'admin_oficina'])],

        loadComponent: () =>
          import('./pages/dashboard/relatorios/relatorios-agendamentos/relatorios-agendamentos.component').then(
            (m) => m.RelatoriosAgendamentosComponent,
          ),
      },

      /**
       * DEFAULT PRIVATE ROUTE
       */
      {
        path: '',
        redirectTo: 'agendamentos',
        pathMatch: 'full',
      },
    ],
  },

  /**
   * =========================================
   * NOT FOUND
   * =========================================
   */
  {
    path: '**',
    redirectTo: '',
  },
];
