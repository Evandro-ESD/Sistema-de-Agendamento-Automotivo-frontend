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
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NotificacaoService } from '../../core/services/notificacao.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-comando',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="comando-layout">
      <aside class="sidebar">
        <h2>COMANDO</h2>
        <hr />
        <nav>
          <a routerLink="agendamentos" routerLinkActive="active"
            >📍 AGENDAMENTOS</a
          >
          <a
            *ngIf="isAdminGeral()"
            routerLink="oficinas"
            routerLinkActive="active"
            >🏢 OFICINAS</a
          >
          <a
            *ngIf="isAdminOficina()"
            routerLink="operacoes"
            routerLinkActive="active"
            >🔧 OPERAÇÕES</a
          >
          <a
            *ngIf="isAdminGeral() || isAdminOficina()"
            routerLink="relatorios"
            routerLinkActive="active"
            >📊 RELATÓRIOS</a
          >
          <button (click)="logout()" class="logout-btn">SAIR</button>
        </nav>
      </aside>
      <main class="content">
        <div class="top-bar">
          <span>👤 {{ user?.nome }} ({{ user?.role }})</span>
        </div>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .comando-layout {
        display: flex;
        min-height: 100vh;
      }
      .sidebar {
        width: 260px;
        background-color: #050505;
        border-right: 1px solid #ff0000;
        padding: 2rem 1rem;
      }
      .sidebar h2 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
      }
      .sidebar nav {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
      }
      .sidebar nav a,
      .logout-btn {
        color: white;
        text-decoration: none;
        font-size: 1.1rem;
        padding: 0.5rem;
        border-left: 2px solid transparent;
        transition: 0.2s;
        background: none;
        text-align: left;
        border: none;
        cursor: pointer;
        font-family: 'Oswald', sans-serif;
      }
      .sidebar nav a.active,
      .sidebar nav a:hover,
      .logout-btn:hover {
        border-left-color: #ff0000;
        background-color: #1a0000;
      }
      .content {
        flex: 1;
        padding: 2rem;
      }
      .top-bar {
        text-align: right;
        margin-bottom: 2rem;
        border-bottom: 1px solid #ff0000;
        padding-bottom: 0.5rem;
      }
      .logout-btn {
        margin-top: 2rem;
        border-left-color: #ff0000;
      }
    `,
  ],
})
export class ComandoComponent implements OnInit {
  private auth = inject(AuthService);
  private notifService = inject(NotificacaoService);
  private router = inject(Router);
  user: User | null = null;

  ngOnInit() {
    this.auth.currentUser$.subscribe((u) => (this.user = u));
    // Inicia polling de notificações (popup + som)
    this.notifService.iniciarPolling((notif) => {
      this.notifService.exibirPopup(notif);
    });
  }

  isAdminGeral(): boolean {
    return this.user?.role === 'admin_geral';
  }

  isAdminOficina(): boolean {
    return this.user?.role === 'admin_oficina';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
