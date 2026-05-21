import { User } from '../models/user';

export const usersMock: User[] = [
  {
    id: 'u_1',
    nome: 'Evandro',
    email: 'admin@site.com',
    senha: '123456',
    role: 'admin_geral',
    plano_id: '',
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Usuarios Oficinas
  {
    id: 'u_2',
    nome: 'Rodrigo',
    email: 'rodrigo@oficina.com',
    senha: '123456',
    role: 'admin_oficina',
    oficina_id: 'of_1',
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'u_5',
    nome: 'Luiz',
    email: 'Luiz@oficina.com',
    senha: '123456',
    role: 'admin_oficina',
    oficina_id: 'of_2',
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Usuarios Associados
  {
    id: 'u_3',
    nome: 'João',
    email: 'joao@gmail.com',
    senha: '123456',
    role: 'associado',
    oficina_id: 'of_1',
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: 'u_4',
    nome: 'Carlos',
    email: 'carlos@gmail.com',
    senha: '123456',
    role: 'associado',
    oficina_id: 'of_1',
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
