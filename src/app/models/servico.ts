export interface Servico {
  id: string;
  oficina_id: string;
  nome: string;
  valor?: number;
  duracao_minutos: number;
  ativo: boolean;
  created_at: string;
}
