import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AgendamentoService } from '../../../../core/services/agendamento.service';
import { AuthService } from '../../../../core/services/auth.service';
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

  ngOnInit() {}

  private readonly route = inject(ActivatedRoute);

  oficinaId = this.route.snapshot.paramMap.get('id');

  authService = inject(AuthService);
  fb = inject(FormBuilder);

  user = this.authService.currentUser();
  // agendamentos: Agendamento[] = [];
  agendamentos: any[] = [];

  lista_oficinas = oficinasMock;

  veiculosDoAssociado: any[] = [];
  erro = '';

  horarios = [];

  form = this.fb.nonNullable.group({
    oficina_id: ['', Validators.required],

    data: ['', Validators.required],

    hora: ['', [Validators.required]],

    servico_id: [{ value: '', disabled: true }, Validators.required],

    veiculo_id: ['Veículo Fake', Validators.required],
  });

  criar() {}

  // ***************************************************

  // ******************************************************

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
