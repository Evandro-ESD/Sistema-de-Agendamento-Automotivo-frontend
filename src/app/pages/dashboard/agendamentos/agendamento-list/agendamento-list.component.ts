import { CommonModule } from '@angular/common';

import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AgendamentoService } from '../../../../core/services/agendamento.service';

import {
  oficinasMock,
  servicosMock,
  veiculosMock,
} from '../../../../mocks/database';

import { AuthService } from '../../../../core/services/auth.service';
import { Servico } from '../../../../models/servico';

@Component({
  selector: 'app-agendamento-list',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './agendamento-list.component.html',
})
export class AgendamentoListComponent implements OnInit {
  private agendamentoService = inject(AgendamentoService);

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  // user = JSON.parse(localStorage.getItem('user') || '{}');
  user = this.authService.currentUser();
  // agendamentos: Agendamento[] = [];
  agendamentos: any[] = [];

  lista_oficinas = oficinasMock;

  servicosDisponiveis: Servico[] = [];

  veiculosDoAssociado: any[] = [];

  // oficinas: Oficina[] = [];

  erro = '';

  loading = false;

  horarios = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];
  servicos = [
    'Troca de óleo',
    'Alinhamento',
    'Balanceamento',
    'Troca de pneus',
    'Revisão',
    'Freios',
    'Suspensão',
    'Diagnóstico',
  ];

  form = this.fb.nonNullable.group({
    oficina_id: ['', Validators.required],

    data: ['', Validators.required],

    hora: ['', [Validators.required, this.validarHorario]],

    servico_id: ['', Validators.required],

    veiculo_id: ['Veículo Fake', Validators.required],
  });

  // Validador de horas
  validarHorario(control: any) {
    const [h, m] = control.value?.split(':').map(Number) || [];
    const minutos = h * 60 + m;
    return minutos >= 8 * 60 && minutos <= 17 * 60
      ? null
      : { horarioInvalido: true };
  }

  ngOnInit() {
    this.configurarOficinas();
    this.carregarAgendamentos();
    this.carregarVeiculosDoAssociado();
    // Quando a oficina mudar, carrega os serviços dela
    this.form.get('oficina_id')?.valueChanges.subscribe((oficinaId) => {
      if (oficinaId) {
        this.servicosDisponiveis = servicosMock.filter(
          (s) => s.oficina_id === oficinaId && s.ativo,
        );
        this.form.get('servico_id')?.enable();
      } else {
        this.servicosDisponiveis = [];
        this.form.get('servico_id')?.disable();
      }
    });

    // Se for admin_oficina desabilita oficina_id
    if (this.user?.role === 'admin_oficina') {
      this.form.get('oficina_id')?.disable();
    }

    // Observa mudança da oficina
    this.form.get('oficina_id')?.valueChanges.subscribe((valor) => {
      const servicoControl = this.form.get('servico_id');

      if (valor) {
        servicoControl?.enable();
      } else {
        servicoControl?.disable();
        servicoControl?.setValue('');
      }
    });

    console.table(this.lista_oficinas);
  }

  carregarVeiculosDoAssociado() {
    if (this.user?.role === 'associado') {
      this.veiculosDoAssociado = veiculosMock.filter(
        (v) => v.associado_id === this.user!.id,
      );
      if (this.veiculosDoAssociado.length === 1) {
        this.form.patchValue({ veiculo_id: this.veiculosDoAssociado[0].id });
      }
    }
  }

  configurarOficinas() {
    // ADMIN GERAL
    if (this.user?.role === 'admin_geral') {
      this.lista_oficinas = oficinasMock;
    }

    // GERENTE
    else if (this.user?.role === 'admin_oficina') {
      this.lista_oficinas = oficinasMock.filter(
        (o) => o.id === this.user?.oficina_id,
      );

      this.form.patchValue({
        oficina_id: this.user?.oficina_id,
      });
    }

    // ASSOCIADO
    else {
      this.lista_oficinas = oficinasMock;
    }
  }

  carregarAgendamentos() {
    this.loading = true;

    this.erro = '';

    this.agendamentoService.listar().subscribe({
      next: (data) => {
        let filtrados = data;
        console.table(filtrados);

        // ASSOCIADO
        if (this.user?.role === 'associado') {
          filtrados = data.filter((ag) => ag.associado_id === this.user?.id);
        }

        // GERENTE DA OFICINA
        else if (this.user?.role === 'admin_oficina') {
          filtrados = data.filter(
            (ag) => ag.oficina_id === this.user?.oficina_id,
          );
        }

        // ADMIN GERAL vê tudo

        this.agendamentos = filtrados.map((ag) => ({
          ...ag,

          servico_nome:
            servicosMock.find((s) => s.id === ag.servico_id)?.nome ||
            ag.servico_id,

          oficina_nome: oficinasMock.find((o) => o.id === ag.oficina_id)?.nome,
        }));

        this.loading = false;
      },

      error: (err) => {
        console.error(err);

        this.erro = 'Erro ao carregar agendamentos';

        this.loading = false;
      },
    });
  }

  criar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { oficina_id, data, hora, servico_id, veiculo_id } =
      this.form.getRawValue();
    const payload = {
      oficina_id,
      data,
      hora,
      servico_id,
      veiculo_id,
      associado_id: this.user!.id,
    };
    this.agendamentoService.criar(payload).subscribe({
      next: () => {
        this.carregarAgendamentos();
        this.form.reset();
      },
      error: (err) => (this.erro = err.error?.detail || 'Erro ao agendar.'),
    });
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

  onFileChange(event: Event, id: string) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.agendamentoService.enviarDocumento(id, file).subscribe();
  }

  uploadDocumento(id: string, file: File) {
    this.agendamentoService
      .enviarDocumento(id, file)
      .subscribe(() => this.carregarAgendamentos());
  }
}
