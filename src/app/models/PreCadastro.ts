export interface PreCadastro {
  id: string;

  nome: string;

  email: string;

  telefone: string;

  oficina_id: string;

  agendamento_id: string;

  status: 'PENDENTE' | 'CONFIRMADO' | 'RECUSADO' | 'CONVERTIDO_ASSOCIADO';

  created_at: string;
}
