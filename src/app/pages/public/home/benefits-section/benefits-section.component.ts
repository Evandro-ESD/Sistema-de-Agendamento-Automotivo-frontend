import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { FeatureCardComponent } from '../../../../shared/components/feature-card/feature-card.component';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-benefits-section',
  standalone: true,
  imports: [CommonModule, FeatureCardComponent],
  templateUrl: './benefits-section.component.html',
})
export class BenefitsSectionComponent {
  features: Feature[] = [
    {
      title: 'Agendamento Inteligente',
      description:
        'Controle completo dos horários e organização eficiente dos atendimentos.',
      icon: 'calendar',
    },

    {
      title: 'Oficinas Credenciadas',
      description:
        'Rede de oficinas parceiras verificadas para maior confiança e segurança.',
      icon: 'shield',
    },

    {
      title: 'Gestão Centralizada',
      description:
        'Visualize serviços, associados e oficinas em uma única plataforma.',
      icon: 'layout-dashboard',
    },

    {
      title: 'Atendimento Rápido',
      description:
        'Fluxo simplificado para agilizar solicitações e confirmações.',
      icon: 'zap',
    },

    {
      title: 'Histórico de Serviços',
      description:
        'Acompanhe manutenções, revisões e registros anteriores dos veículos.',
      icon: 'history',
    },

    {
      title: 'Plataforma Segura',
      description:
        'Ambiente protegido com controle de acesso e gerenciamento de usuários.',
      icon: 'lock',
    },

    {
      title: 'Relatórios Estratégicos',
      description:
        'Indicadores e relatórios para análise operacional e tomada de decisão.',
      icon: 'bar-chart-3',
    },

    {
      title: 'Experiência Premium',
      description:
        'Interface moderna inspirada em plataformas SaaS e concessionárias.',
      icon: 'sparkles',
    },
  ];
}
