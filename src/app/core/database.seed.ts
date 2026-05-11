import {
  agendamentosMock,
  oficinasMock,
  servicosMock,
  usersMock,
  veiculosMock,
} from '../mocks/database';

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
  if (!localStorage.getItem('veiculos')) {
    localStorage.setItem('veiculos', JSON.stringify(veiculosMock));
  }
  if (!localStorage.getItem('agendamentos')) {
    localStorage.setItem('agendamentos', JSON.stringify(agendamentosMock));
  }
}
