// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-agendamento-list',
//   imports: [],
//   templateUrl: './agendamento-list.component.html',
//   styleUrl: './agendamento-list.component.css'
// })
// export class AgendamentoListComponent {

// }
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AgendamentoService } from '../../../../core/services/agendamento.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Agendamento } from '../../../../models/agendamento';

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>AGENDAMENTOS</h2>
    <hr />

    <!-- Formulário de novo agendamento (só associado vê) -->
    <div *ngIf="user?.role === 'associado'" class="card">
      <h3>NOVO AGENDAMENTO</h3>
      <form [formGroup]="form" (ngSubmit)="criar()">
        <input formControlName="oficina_id" placeholder="ID da oficina" />
        <input type="date" formControlName="data" />
        <input type="time" formControlName="hora" />
        <input formControlName="servico" placeholder="Serviço" />
        <button type="submit">AGENDAR</button>
      </form>
      <div *ngIf="erro" class="error">{{ erro }}</div>
    </div>

    <!-- Tabela de agendamentos -->
    <div class="card">
      <h3>LISTA DE SERVIÇOS</h3>
      <table style="width:100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Data/Hora</th>
            <th>Serviço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let a of agendamentos">
            <td>{{ a.data }} {{ a.hora }}</td>
            <td>{{ a.servico }}</td>
            <td>{{ a.status }}</td>
            <td>
              <button *ngIf="a.status === 'AGENDADO'" (click)="cancelar(a.id)">
                Cancelar
              </button>
              <button
                *ngIf="
                  user?.role === 'associado' && a.status === 'EM_ANDAMENTO'
                "
                (click)="finalizar(a.id, 'FINALIZADO_ASSOCIADO')"
              >
                Finalizar (cliente)
              </button>
              <button
                *ngIf="
                  user?.role === 'admin_oficina' && a.status === 'EM_ANDAMENTO'
                "
                (click)="finalizar(a.id, 'FINALIZADO_OFICINA')"
              >
                Finalizar (oficina)
              </button>
              <input
                *ngIf="
                  user?.role === 'admin_oficina' &&
                  a.status === 'FINALIZADO_OFICINA'
                "
                type="file"
                #doc
                (change)="uploadDocumento(a.id, doc.files[0])"
                accept="application/pdf"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class AgendamentoListComponent implements OnInit {
  private agendamentoService = inject(AgendamentoService);
  private auth = inject(AuthService);
  private fb = inject(FormBuilder);
  user = JSON.parse(localStorage.getItem('user') || '{}');
  agendamentos: Agendamento[] = [];
  erro = '';

  form = this.fb.group({
    oficina_id: ['', Validators.required],
    data: ['', Validators.required],
    hora: ['', Validators.required],
    servico: ['', Validators.required],
  });

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.agendamentoService.listar().subscribe({
      next: (data) => (this.agendamentos = data),
      error: (err) => console.error(err),
    });
  }

  criar() {
    if (this.form.valid) {
      this.agendamentoService.criar(this.form.value as any).subscribe({
        next: () => {
          this.carregarAgendamentos();
          this.form.reset();
        },
        error: (err) => (this.erro = err.error?.detail || 'Erro ao agendar'),
      });
    }
  }

  cancelar(id: string) {
    this.agendamentoService
      .cancelar(id)
      .subscribe(() => this.carregarAgendamentos());
  }

  finalizar(id: string, status: string) {
    this.agendamentoService
      .atualizarStatus(id, status)
      .subscribe(() => this.carregarAgendamentos());
  }
  uploadDocumento(id: string, file: File) {
    if (file) {
      this.agendamentoService
        .enviarDocumento(id, file)
        .subscribe(() => this.carregarAgendamentos());
    }
  }
}
