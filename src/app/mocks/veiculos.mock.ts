import { Veiculo } from '../models/veiculo';

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
