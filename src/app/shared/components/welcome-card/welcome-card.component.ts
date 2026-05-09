import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FeatureCardComponent } from '../feature-card/feature-card.component';

@Component({
  selector: 'app-welcome-card',
  imports: [RouterLink, FeatureCardComponent],
  templateUrl: './welcome-card.component.html',
  styleUrls: ['./welcome-card.component.css'],
})
export class WelcomeCardComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  features = [
    {
      title: 'Agendamento Inteligente',
      description: 'Evita conflitos de horários entre oficinas e associados.',
    },

    {
      title: 'Controle de Planos',
      description: 'Limites mensais por associado e tipo de serviço.',
    },

    {
      title: 'Assinatura Digital',
      description: 'Finalização de serviços com documento assinado.',
    },

    {
      title: 'Notificações em Tempo Real',
      description: 'Alertas automáticos via popup e som.',
    },
  ];
}
