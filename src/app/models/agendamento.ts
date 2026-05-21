/**
 * Status possíveis de um agendamento da oficina.
 * Controla todo o fluxo desde criação até conclusão.
 *
 * @readonly
 * @enum {string}
 */
export const STATUS_AGENDAMENTO = {
  /**
   * AGENDADO - Estado inicial.
   * O associado criou o agendamento pelo app/site e está aguardando
   * a oficina aceitar ou recusar.
   */
  AGENDADO: 'AGENDADO',

  /**
   * CONFIRMADO - Oficina aceitou o serviço.
   * A oficina visualizou e confirmou que vai atender na data/hora marcada.
   * Associado é notificado.
   */
  CONFIRMADO: 'CONFIRMADO',

  /**
   * EM_ANDAMENTO - Serviço iniciou na oficina.
   * O veículo já está no box e o mecânico começou o trabalho.
   * Dispara cobrança de SLA.
   */
  EM_ANDAMENTO: 'EM_ANDAMENTO',

  /**
   * AGUARDANDO_CONFIRMACAO_ASSOCIADO - Oficina marcou como finalizado.
   * O serviço foi concluído pela oficina e agora depende do associado.
   * Ações pendentes do associado:
   * 1. Confirmar que o serviço foi feito
   * 2. Assinar documento/OS digital
   * 3. Validar entrega do veículo
   */
  AGUARDANDO_CONFIRMACAO_ASSOCIADO: 'AGUARDANDO_CONFIRMACAO_ASSOCIADO',

  /**
   * CONCLUIDO - Processo encerrado.
   * Associado confirmou, assinou e validou.
   * Agendamento arquivado. Libera faturamento.
   */
  CONCLUIDO: 'CONCLUIDO',
};

Object.freeze(STATUS_AGENDAMENTO); // Impede alteração
export type AgendamentoStatus =
  (typeof STATUS_AGENDAMENTO)[keyof typeof STATUS_AGENDAMENTO];

export interface Agendamento {
  id: string;

  associado_id: string;

  oficina_id: string;

  oficina_servico_id: string;

  veiculo_id: string;

  data: string;

  hora: string;

  status: AgendamentoStatus;

  observacoes?: string;

  observacoes_oficina?: string;

  documento_assinado_url?: string;

  cancelado_por?: 'ASSOCIADO' | 'OFICINA' | 'ADMIN';

  created_at: string;

  updated_at: string;
}

export interface AgendamentoCreate {
  oficina_id: string;
  oficina_servico_id: string;
  veiculo_id: string;

  data: string;
  hora: string;

  observacoes: string;
}
