export interface OficinaServico {
  id: string;
  oficina_id: string;
  servico_id: string;

  duracao_minutos: number;

  preco?: number;

  ativo: boolean;

  created_at: string;
}
