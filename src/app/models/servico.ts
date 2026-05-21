export interface Servico {
  id: string;
  nome: string;
  descricao?: string;
  // criado_por_oficina: string;
  // oficina_id: string;
  // duracao_minutos: number;
  ativo: boolean;
  created_at: string;
  updated_at?: string;
}
