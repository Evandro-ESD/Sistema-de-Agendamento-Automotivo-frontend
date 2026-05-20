import { Agendamento } from '../models/agendamento';
import { Oficina } from '../models/oficina';
import { Servico } from '../models/servico';
import { User } from '../models/user';
import { Veiculo } from '../models/veiculo';

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

// Serviço de aquecimento, ventilação e ar condicionado
export const servicosMock: Servico[] = [
  {
    id: 's_1',
    nome: 'Troca de óleo',
    descricao: '',
    criado_por_oficina: '',
    oficina_id: 'of_1',
    duracao_minutos: 30,
    ativo: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's_1',
    nome: 'Troca de óleo',
    descricao: '',
    criado_por_oficina: '',
    oficina_id: 'of_2',
    duracao_minutos: 30,
    ativo: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's_1',
    nome: 'Troca de óleo',
    descricao: '',
    criado_por_oficina: '',
    oficina_id: 'of_3',
    duracao_minutos: 30,
    ativo: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's_2',
    nome: 'Alinhamento',
    descricao: '',
    criado_por_oficina: '',
    oficina_id: 'of_1',
    duracao_minutos: 60,
    ativo: true,
    created_at: new Date().toISOString(),
  },

  {
    id: 's_2',
    nome: 'Alinhamento',
    descricao: '',
    criado_por_oficina: '',
    oficina_id: 'of_2',
    duracao_minutos: 60,
    ativo: true,
    created_at: new Date().toISOString(),
  },

  {
    id: 's_2',
    nome: 'Alinhamento',
    descricao: '',
    criado_por_oficina: '',
    oficina_id: 'of_3',
    duracao_minutos: 60,
    ativo: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 's_3',
    nome: 'Ar Condicionado',
    descricao: '',
    criado_por_oficina: '',
    oficina_id: 'of_4',
    duracao_minutos: 60,
    ativo: true,
    created_at: new Date().toISOString(),
  },

  {
    id: 's_4',
    nome: 'Recarga de gás',
    descricao: '',
    criado_por_oficina: '',
    oficina_id: 'of_4',
    duracao_minutos: 60,
    ativo: true,
    created_at: new Date().toISOString(),
  },
];

export const veiculosMock: Veiculo[] = [
  {
    id: 'v_1',
    associado_id: 'u_3',
    marca: 'Oficina Fake',
    modelo: 'Civic',
    placa: 'ABC1234',
    ano: 2020,
    created_at: new Date().toISOString(),
  },
];

export const agendamentosMock: Agendamento[] = [
  {
    id: 'a_1',
    associado_id: 'u_3',
    oficina_id: 'of_1',
    servico_id: 's_1',
    veiculo_id: 'v_1',
    data: '2026-05-20',
    hora: '14:00:00',
    status: 'AGENDADO',
    observacoes: 'Cliente solicitou revisão completa',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
