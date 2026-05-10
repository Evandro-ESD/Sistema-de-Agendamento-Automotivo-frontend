// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-agendamento-list',
//   imports: [],
//   templateUrl: './agendamento-list.component.html',
//   styleUrl: './agendamento-list.component.css'
// })
// export class AgendamentoListComponent {

// }
/*
thead>
         Event, id: string) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.uploadDocumento(id, file);
    }
  }
  */
// novo

import { CommonModule } from '@angular/common';

import { Component, OnInit, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AgendamentoService } from '../../../../core/services/agendamento.service';

import { Agendamento } from '../../../../models/agendamento';

@Component({
  selector: 'app-agendamento-list',

  standalone: true,

  imports: [CommonModule, ReactiveFormsModule],

  templateUrl: './agendamento-list.component.html',
})
export class AgendamentoListComponent implements OnInit {
  private agendamentoService = inject(AgendamentoService);

  private fb = inject(FormBuilder);

  user = JSON.parse(localStorage.getItem('user') || '{}');

  agendamentos: Agendamento[] = [];

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
    oficina_id: [
      { value: 'Fake Oficina', disabled: true },
      Validators.required,
    ],

    data: ['', Validators.required],

    hora: [
      '',
      [
        Validators.required,
        // Validators.pattern(/^(08|09|1[0-6]|16):[0-5][0-9]$/),
        this.validarHorario,
      ],
    ],

    servico: ['', Validators.required],
  });

  // Validador de houras
  validarHorario(control: any) {
    const valor = control.value;

    if (!valor) return null;

    const [hora, minuto] = valor.split(':').map(Number);

    const totalMinutos = hora * 60 + minuto;

    const minimo = 8 * 60; // 08:00
    const maximo = 17 * 60; // 17:00

    if (totalMinutos < minimo || totalMinutos > maximo) {
      return {
        horarioInvalido: true,
      };
    }

    return null;
  }

  // Validador de houras

  ngOnInit() {
    this.carregarAgendamentos();
  }

  carregarAgendamentos() {
    this.loading = true;

    this.agendamentoService.listar().subscribe({
      next: (data) => {
        this.agendamentos = data;
        console.log(data);
      },

      error: (err) => {
        console.error(err);
      },

      complete: () => {
        this.loading = false;
      },
    });
  }

  criar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.agendamentoService.criar(this.form.getRawValue()).subscribe({
      next: () => {
        this.carregarAgendamentos();

        this.form.reset();
      },

      error: (err) => {
        this.erro = err.error?.detail || 'Erro ao agendar.';
      },
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
    const input = event.target as HTMLInputElement;

    const file = input.files?.[0];

    if (file) {
      this.uploadDocumento(id, file);
    }
  }

  uploadDocumento(id: string, file: File) {
    this.agendamentoService
      .enviarDocumento(id, file)
      .subscribe(() => this.carregarAgendamentos());
  }
}
