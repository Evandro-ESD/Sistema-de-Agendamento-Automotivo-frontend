import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { oficinasMock } from '../../../../mocks/database';
import { Servico } from './../../../../models/servico';

@Component({
  selector: 'app-oficina_1',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './oficina_1.component.html',
  styleUrls: ['./oficina_1.component.css'],
})
export class Oficina_1Component implements OnInit {
  constructor() {}

  ngOnInit() {}
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  user = this.authService.currentUser();
  // agendamentos: Agendamento[] = [];
  agendamentos: any[] = [];

  lista_oficinas = oficinasMock;

  servicosDisponiveis: Servico[] = [];

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
}
