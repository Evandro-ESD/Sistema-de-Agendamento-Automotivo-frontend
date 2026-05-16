export interface Oficina {
  id: string;

  nome: string;

  endereco: string;
  telefone: string;
  email?: string;

  logo_url?: string;

  ativa: boolean;

  created_at: string;
  updated_at: string;
}
