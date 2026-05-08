import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'comando',
    loadComponent: () =>
      import('./pages/comando/comando.component').then(
        (m) => m.ComandoComponent,
      ),
    canActivate: [authGuard],
    children: [
      {
        path: 'agendamentos',
        loadComponent: () =>
          import('./pages/comando/agendamentos/agendamento-list.component').then(
            (m) => m.AgendamentoListComponent,
          ),
      },
      {
        path: 'oficinas',
        loadComponent: () =>
          import('./pages/comando/oficinas/oficina-list.component').then(
            (m) => m.OficinaListComponent,
          ),
        canActivate: [roleGuard(['admin_geral'])],
      },
      {
        path: 'relatorios',
        loadComponent: () =>
          import('./pages/comando/relatorios/relatorio-agendamentos.component').then(
            (m) => m.RelatorioAgendamentosComponent,
          ),
        canActivate: [roleGuard(['admin_geral', 'admin_oficina'])],
      },
      { path: '', redirectTo: 'agendamentos', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
