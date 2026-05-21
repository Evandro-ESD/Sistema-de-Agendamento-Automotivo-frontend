import { Agendamento } from '../models/agendamento';

export const agendamentosMock: Agendamento[] = [
  {
    id: 'a_1',
    associado_id: 'u_3',
    oficina_id: 'of_1',
    oficina_servico_id: 'ofs_1',
    veiculo_id: 'v_1',
    data: '2026-05-20',
    hora: '14:00:00',
    status: 'AGENDADO',
    observacoes: 'Cliente solicitou revisão completa',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
