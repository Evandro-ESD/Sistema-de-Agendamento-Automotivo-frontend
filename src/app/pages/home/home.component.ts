// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   imports: [],
//   templateUrl: './home.component.html',
//   styleUrl: './home.component.css'
// })
// export class HomeComponent {

// }
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container">
      <h1>AGENDAMENTO AUTOMOTIVO</h1>
      <hr />
      <p>
        Sistema industrial de gestão de serviços para oficinas e associados.
      </p>
      <div style="display: flex; gap: 1rem; margin: 2rem 0;">
        <a routerLink="/login" class="btn">ACESSAR</a>
        <a routerLink="/register" class="btn">CADASTRAR</a>
      </div>

      <div class="card">
        <h2>⚙️ FEATURES</h2>
        <ul style="list-style: none;">
          <li>✓ Agendamento sem conflito de horário</li>
          <li>✓ Planos com limite mensal</li>
          <li>✓ Finalização com documento assinado</li>
          <li>✓ Notificações em tempo real (popup + som)</li>
          <li>✓ Relatórios por período/oficina/associado</li>
        </ul>
      </div>
    </div>
  `,
  styles: [
    `
      h1 {
        font-size: 3rem;
        letter-spacing: -0.02em;
      }
      .btn {
        display: inline-block;
        text-decoration: none;
      }
    `,
  ],
})
export class HomeComponent {}
