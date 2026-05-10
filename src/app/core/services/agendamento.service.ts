import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Agendamento, AgendamentoCreate } from '../../models/agendamento';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/v1/agendamentos';

  /*    Teste para salvar agendamentos no localStorage

  import { delay } from 'rxjs';
  import { of} from 'rxjs';
  */

  private storageKey = 'agendamentos';

  private agendamentos: any[] = [];

  constructor() {
    const dados = localStorage.getItem(this.storageKey);

    if (dados) {
      this.agendamentos = JSON.parse(dados);
    }
  }

  private salvar() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.agendamentos));
  }

  listar(): Observable<any[]> {
    return of(this.agendamentos).pipe(
      map((lista) =>
        lista.sort((a, b) => {
          const dataHoraA = new Date(`${a.data}T${a.hora}`);

          const dataHoraB = new Date(`${b.data}T${b.hora}`);

          return dataHoraA.getTime() - dataHoraB.getTime();
        }),
      ),

      delay(300),
    );
  }

  _listar(filtros?: {
    oficina_id?: string;
    data_inicio?: string;
    data_fim?: string;
  }): Observable<Agendamento[]> {
    let params: any = {};
    if (filtros) params = filtros;
    return this.http.get<Agendamento[]>(this.apiUrl, { params });
  }

  criar(dados: any): Observable<any> {
    const novoAgendamento = {
      id: crypto.randomUUID(),

      ...dados,

      status: 'AGENDADO',

      criado_em: new Date(),
    };

    this.agendamentos.push(novoAgendamento);

    this.salvar();

    return of(novoAgendamento).pipe(delay(300));
  }

  _criar(dados: AgendamentoCreate): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, dados);
  }

  atualizarStatus(id: string, status: string): Observable<any> {
    const agendamento = this.agendamentos.find((a) => a.id === id);

    if (agendamento) {
      agendamento.status = status;

      this.salvar();
    }

    return of(true).pipe(delay(300));
  }

  _atualizarStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  cancelar(id: string): Observable<any> {
    this.agendamentos = this.agendamentos.filter((a) => a.id !== id);

    this.salvar();

    return of(true).pipe(delay(300));
  }

  _cancelar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  enviarDocumento(id: string, file: File): Observable<any> {
    const agendamento = this.agendamentos.find((a) => a.id === id);

    if (agendamento) {
      agendamento.documento = file.name;

      this.salvar();
    }

    return of(true).pipe(delay(300));
  }

  _enviarDocumento(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/documento`, formData);
  }
}
