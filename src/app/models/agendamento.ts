export type AgendamentoStatus =
  | 'AGENDADO'
  | 'EM_ANDAMENTO'
  | 'FINALIZADO_ASSOCIADO'
  | 'FINALIZADO_OFICINA'
  | 'CONCLUIDO'
  | 'CANCELADO';

export interface Agendamento {
  id: string;

  associado_id: string;
  oficina_id: string;

  servico_id: string;

  veiculo_id: string;

  data_hora: string;
  // data: string; // YYYY-MM-DD
  // hora: string; // HH:MM:SS
  // servico: string;
  status: AgendamentoStatus;

  observacoes?: string;

  documento_assinado_url?: string;

  created_at: string;
  updated_at: string;
}

export interface AgendamentoCreate {
  oficina_id: string;
  data: string;
  hora: string;
  servico: string;
}
