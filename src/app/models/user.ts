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
