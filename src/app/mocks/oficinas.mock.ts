import { Oficina } from '../models/oficina';

export const oficinasMock: Oficina[] = [
  {
    id: 'of_1',
    nome: 'Oficina do Rodrigo',
    endereco: 'Rua A',
    telefone: '21999999999',
    ativa: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'of_2',
    nome: 'Oficina do Luiz',
    endereco: 'Rua B',
    telefone: '21988888888',
    ativa: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'of_3',
    nome: 'Roberto Mecânica',
    endereco: 'Rua C',
    telefone: '21977777777',
    ativa: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'of_4',
    nome: 'Refrigekar',
    endereco: 'Rua D',
    telefone: '21966666666',
    ativa: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
