import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  // =========================
  // BASE METHODS
  // =========================

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data) as T;
    } catch (error) {
      console.log(`Erro ao fazer parse da chave ${key}`, error);

      return null;
    }
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  update<T>(key: string, callback: (data: T) => T): void {
    const currentData = this.get<T>(key);

    if (currentData) {
      const updated = callback(currentData);

      this.set(key, updated);
    }
  }

  // =========================
  // ARRAY HELPERS
  // =========================

  pushItem<T>(key: string, item: T): void {
    const current = this.get<T[]>(key) || [];

    current.unshift(item);

    this.set(key, current);
  }

  getArray<T>(key: string): T[] {
    return this.get<T[]>(key) || [];
  }

  replaceItem<T extends { id: string }>(
    key: string,
    id: string,
    updatedItem: Partial<T>,
  ): void {
    const current = this.getArray<T>(key);

    const updated = current.map((item) =>
      item.id === id
        ? {
            ...item,
            ...updatedItem,
          }
        : item,
    );

    this.set(key, updated);
  }

  removeItemById<T extends { id: string }>(key: string, id: string): void {
    const current = this.getArray<T>(key);

    const filtered = current.filter((item) => item.id !== id);

    this.set(key, filtered);
  }

  // =========================
  // PRÉ-AGENDAMENTO
  // =========================

  salvarPreAgendamento(data: any): void {
    const agendamento = {
      id: crypto.randomUUID(),

      associado_id: data.associado_id || null,
      oficina_id: data.oficina_id,
      oficina_servico_id: data.oficina_servico_id,
      veiculo_id: data.veiculo_id || null,

      nome_cliente: data.nome_cliente,
      telefone_cliente: data.telefone_cliente,
      email_cliente: data.email_cliente,

      oficina_nome: data.oficina_nome,
      servico_nome: data.servico_nome,
      veiculo_nome: data.veiculo_nome || 'Não informado',

      data: data.data,
      hora: data.hora,

      status: 'AGENDADO',

      observacoes: data.observacoes || '',

      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.pushItem('agendamentos', agendamento);
  }

  listarPreAgendamentos<T>(): T[] {
    return this.getArray<T>('agendamentos');
  }

  atualizarStatusAgendamento(id: string, status: string): void {
    this.replaceItem<any>('agendamentos', id, {
      status,
      updated_at: new Date().toISOString(),
    });
  }

  cancelarAgendamento(id: string): void {
    this.removeItemById('agendamentos', id);
  }
}
