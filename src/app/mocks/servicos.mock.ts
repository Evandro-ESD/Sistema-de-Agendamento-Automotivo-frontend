import { Servico } from '../models/servico';

export const servicosMock: Servico[] = [
  {
    id: 'srv_1',
    nome: 'Troca de óleo',
    ativo: true,
    created_at: new Date().toISOString(),
  },

  {
    id: 'srv_2',
    nome: 'Alinhamento',
    ativo: true,
    created_at: new Date().toISOString(),
  },

  {
    id: 'srv_3',
    nome: 'Freios',
    ativo: true,
    created_at: new Date().toISOString(),
  },

  {
    id: 'srv_4',
    nome: 'Suspensão',
    ativo: true,
    created_at: new Date().toISOString(),
  },
];
