import {
  agendamentosMock,
  oficinaServicoMock,
  oficinasMock,
  servicosMock,
  veiculosMock,
} from '../mocks';
import { usersMock } from '../mocks/users.mock';

export function seedDatabase() {
  if (!localStorage.getItem('oficinas')) {
    localStorage.setItem('oficinas', JSON.stringify(oficinasMock));
  }
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(usersMock));
  }
  if (!localStorage.getItem('servicos')) {
    localStorage.setItem('servicos', JSON.stringify(servicosMock));
  }
  // NOVO
  if (!localStorage.getItem('oficina_servicos')) {
    localStorage.setItem(
      'oficina_servicos',
      JSON.stringify(oficinaServicoMock),
    );
  }
  if (!localStorage.getItem('veiculos')) {
    localStorage.setItem('veiculos', JSON.stringify(veiculosMock));
  }
  if (!localStorage.getItem('agendamentos')) {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentosMock));
  }
}
