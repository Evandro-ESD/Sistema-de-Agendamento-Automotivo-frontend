import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgendamentoService } from '../../../../core/services/agendamento.service';
import { LocalStorageService } from '../../../../core/services/localStorage.service';
import { OficinaServicoService } from '../../../../core/services/oficina-servico.service';
import { oficinasMock } from '../../../../mocks';
import { Oficina } from '../../../../models/oficina';
import { OficinaServicoDetalhado } from '../../../../models/oficina-servico-detalhado';

@Component({
  selector: 'app-oficina_1',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './oficina_1.component.html',
  styleUrls: ['./oficina_1.component.css'],
})
export class Oficina_1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    if (!this.oficinaId) return;

    const oficina = this.oficinas().find((o) => o.id === this.oficinaId);
    console.log(oficina);

    this.selecionarOficina(oficina!);

    if (!oficina) return;

    this.selectedOficina.set(oficina);

    this.loadingServices.set(true);

    this.oficinaServicoService
      .listarDetalhadoPorOficina(this.oficinaId)
      .subscribe({
        next: (servicos) => {
          this.servicosDisponiveis.set(servicos);

          this.loadingServices.set(false);

          this.step.set('servico');
        },
      });
  }

  private readonly route = inject(ActivatedRoute);

  oficinaId = this.route.snapshot.paramMap.get('id');

  oficinas = signal(oficinasMock);
  servicosDisponiveis = signal<OficinaServicoDetalhado[]>([]);
  selectedOficina = signal<Oficina | null>(null);
  selectedServico = signal<OficinaServicoDetalhado | null>(null);
  loadingServices = signal(false);
  selectedDate = signal('');
  selectedHour = signal('');
  step = signal<'oficina' | 'servico' | 'data' | 'confirmacao'>('oficina');
  oficinaServicoService = inject(OficinaServicoService);
  agendamentoService = inject(AgendamentoService);
  localStorageService = inject(LocalStorageService);

  oficinaEscolhida = computed(() => {
    const lista = this.oficinas();
    const encontrada = lista.find((o) => o.id === this.oficinaId);
    return encontrada ? encontrada.nome : 'Oficina não encontrada';
  });

  // Voltar etapas step
  voltarStep(): void {
    if (this.step() === 'data') {
      this.step.set('servico');
      return;
    }

    if (this.step() === 'servico') {
      this.step.set('oficina');
      return;
    }

    if (this.step() === 'confirmacao') {
      this.step.set('data');
    }
  }

  // Para carregar a oficina selecionada no menu "Agende seu serviço"
  selecionarOficina(oficina: Oficina): void {
    this.oficinaId = oficina.id;

    this.selectedOficina.set(oficina);

    this.loadingServices.set(true);

    this.oficinaServicoService.listarDetalhadoPorOficina(oficina.id).subscribe({
      next: (servicos) => {
        this.servicosDisponiveis.set(servicos);

        this.loadingServices.set(false);

        this.step.set('servico');
      },
    });
  }

  //

  // 2. Carregar serviços da oficina
  onOficinaChange(event: Event): void {
    const oficinaId = (event.target as HTMLSelectElement).value;

    if (!oficinaId) return;

    const oficina = this.oficinas().find((o) => o.id === oficinaId);

    if (!oficina) return;

    this.selectedOficina.set(oficina);

    this.loadingServices.set(true);

    this.oficinaServicoService.listarDetalhadoPorOficina(oficinaId).subscribe({
      next: (servicos) => {
        this.servicosDisponiveis.set(servicos);

        this.loadingServices.set(false);

        this.step.set('servico');
      },
    });
  }

  // 4. Selecionar serviço
  selectServico(servico: OficinaServicoDetalhado): void {
    this.selectedServico.set(servico);

    this.step.set('data');
  }

  criarAgendamento(): void {
    const oficina = this.selectedOficina();

    const servico = this.selectedServico();

    if (!oficina || !servico) {
      return;
    }
    // 6. Criar agendamento
    this.agendamentoService
      .criar({
        associado_id: 'assoc_1',

        oficina_id: oficina.id,

        oficina_servico_id: servico.servico_id,

        veiculo_id: 'veic_1',

        data: this.selectedDate(),

        hora: this.selectedHour(),

        observacoes: '',
      })
      .subscribe({
        next: () => {
          alert('Agendamento criado!');

          this.step.set('confirmacao');
        },
      });
  }
}
