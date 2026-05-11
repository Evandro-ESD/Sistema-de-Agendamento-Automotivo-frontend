/*
export interface User {
  id: string;
  nome: string;
  email: string;
  role: UserRole;
  oficina_id?: string;
  plano_id?: string;
}
export type UserRole = 'admin_geral' | 'admin_oficina' | 'associado';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

*/

export type UserRole = 'admin_geral' | 'admin_oficina' | 'associado';

export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
  oficina_id?: string;
  plano_id?: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}
