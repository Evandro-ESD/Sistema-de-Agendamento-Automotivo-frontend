import { OficinaServico } from '../models/oficina-servico';

export const oficinaServicoMock: OficinaServico[] = [
  {
    id: 'ofs_1',
    oficina_id: 'of_1',
    servico_id: 'srv_1',
    duracao_minutos: 30,
    preco: 120,
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: 'ofs_2',
    oficina_id: 'of_1',
    servico_id: 'srv_2',
    duracao_minutos: 60,
    preco: 180,
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: 'ofs_3',
    oficina_id: 'of_4',
    servico_id: 'srv_1',
    duracao_minutos: 40,
    preco: 150,
    ativo: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
