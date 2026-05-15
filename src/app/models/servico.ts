export interface Servico {
  id: string;
  oficina_id: string;
  nome: string;
  duracao_minutos: number;
  ativo: boolean;
  created_at: string;
}
