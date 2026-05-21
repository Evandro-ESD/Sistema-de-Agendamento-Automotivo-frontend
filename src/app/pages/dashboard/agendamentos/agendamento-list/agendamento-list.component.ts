import { Component, computed, inject, OnInit, signal } from '@angular/core';

import {
  Agendamento,
  STATUS_AGENDAMENTO,
} from '../../../../models/agendamento';

import { AgendamentoService } from '../../../../core/services/agendamento.service';
import { AuthService } from '../../../../core/services/auth.service';

import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../../core/services/localStorage.service';

type AgendamentoView = Agendamento & {
  servico_nome?: string;
  oficina_nome?: string;
  veiculo_nome?: string;
  nome_cliente?: string;
  email_cliente?: string;
  telefone_cliente?: string;
};

@Component({
  selector: 'app-agendamento-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agendamento-list.component.html',
})
export class AgendamentoListComponent implements OnInit {
  private readonly agendamentoService = inject(AgendamentoService);
  private readonly authService = inject(AuthService);

  readonly user = this.authService.currentUser();

  readonly STATUS = STATUS_AGENDAMENTO;

  private readonly localStorageService = inject(LocalStorageService);

  agendamentos = signal<AgendamentoView[]>([]);

  loading = signal(false);
  erro = signal('');

  totalAgendamentos = computed(() => this.agendamentos().length);

  proximosAgendamentos = computed(() => {
    return this.agendamentos()
      .filter((a) => a.status !== STATUS_AGENDAMENTO.CONCLUIDO)
      .slice(0, 3);
  });

  ngOnInit(): void {
    this.carregarAgendamentos();

    this.agendamentos().map((a) => {
      console.log('Agendamentos:\n:', a.pre_cadastro_id);
    });
    this.agendamentos().forEach((a) => {
      console.log(a.status);
    });
  }

  carregarAgendamentos(): void {
    this.loading.set(true);

    this.erro.set('');

    try {
      const data =
        this.localStorageService.getArray<AgendamentoView>('agendamentos');

      let filtrados = data;

      // ASSOCIADO
      if (this.user?.role === 'associado') {
        filtrados = data.filter((ag) => ag.associado_id === this.user?.id);
      }

      // ADMIN OFICINA
      else if (this.user?.role === 'admin_oficina') {
        filtrados = data.filter(
          (ag) => ag.oficina_id === this.user?.oficina_id,
        );
      }

      this.agendamentos.set(filtrados);

      this.loading.set(false);
    } catch {
      this.erro.set('Erro ao carregar agendamentos');

      this.loading.set(false);
    }
  }

  cancelar(id: string): void {
    this.agendamentoService.cancelar(id).subscribe(() => {
      this.carregarAgendamentos();
    });
  }
  confirmar(id: string): void {
    this.agendamentoService
      .atualizarStatus(id, STATUS_AGENDAMENTO.CONFIRMADO)
      .subscribe(() => {
        this.carregarAgendamentos();
      });
  }

  iniciarServico(id: string): void {
    this.agendamentoService
      .atualizarStatus(id, STATUS_AGENDAMENTO.EM_ANDAMENTO)
      .subscribe(() => {
        this.carregarAgendamentos();
      });
  }

  finalizarServico(id: string): void {
    this.agendamentoService
      .atualizarStatus(id, STATUS_AGENDAMENTO.AGUARDANDO_CONFIRMACAO_ASSOCIADO)
      .subscribe(() => {
        this.carregarAgendamentos();
      });
  }

  confirmarConclusao(id: string): void {
    this.agendamentoService
      .atualizarStatus(id, STATUS_AGENDAMENTO.CONCLUIDO)
      .subscribe(() => {
        this.carregarAgendamentos();
      });
  }
}
