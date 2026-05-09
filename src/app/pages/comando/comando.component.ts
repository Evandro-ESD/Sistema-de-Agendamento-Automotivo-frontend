// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-comando',
//   imports: [],
//   templateUrl: './comando.component.html',
//   styleUrl: './comando.component.css'
// })
// export class ComandoComponent {

// }

import { CommonModule } from '@angular/common';

import { Component, OnInit, inject } from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

import { NotificacaoService } from '../../core/services/notificacao.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-comando',

  standalone: true,

  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],

  templateUrl: './comando.component.html',
})
export class ComandoComponent implements OnInit {
  private auth = inject(AuthService);

  private notifService = inject(NotificacaoService);

  private router = inject(Router);

  user: User | null = null;

  sidebarOpen = false;

  ngOnInit() {
    this.auth.currentUser$.subscribe(
      (u) => (this.user = u),
    );

    this.notifService.iniciarPolling(
      (notif) => {
        this.notifService.exibirPopup(
          notif,
        );
      },
    );
  }

  isAdminGeral(): boolean {
    return (
      this.user?.role ===
      'admin_geral'
    );
  }

  isAdminOficina(): boolean {
    return (
      this.user?.role ===
      'admin_oficina'
    );
  }

  toggleSidebar() {
    this.sidebarOpen =
      !this.sidebarOpen;
  }

  logout() {
    this.auth.logout();

    this.router.navigate(['/']);
  }
}
