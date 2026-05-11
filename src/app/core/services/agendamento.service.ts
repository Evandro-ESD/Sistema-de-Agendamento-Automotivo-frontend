import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { agendamentosMock } from '../../mocks/database';
import { Agendamento, AgendamentoCreate } from '../../models/agendamento';
import { LocalStorageService } from './localStorage.service';

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

  private localStorageService = inject(LocalStorageService);

  constructor() {
    const stored = this.localStorageService.get<Agendamento>(this.storageKey);
    this.agendamentos = this.storageKey ? stored : agendamentosMock;

    // const dados = localStorage.getItem(this.storageKey);

    // if (dados) {
    //   this.agendamentos = JSON.parse(dados);
    // }
  }

  private salvar() {
    this.localStorageService.set(this.storageKey, this.agendamentos);
  }

  private _salvar() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.agendamentos));
  }

  listar(): Observable<Agendamento[]> {
    return of(this.agendamentos).pipe(
      map((lista) =>
        [...lista].sort(
          (a, b) =>
            new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime(),
        ),
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

  criar(dados: Partial<Agendamento>): Observable<Agendamento> {
    const novo: Agendamento = {
      id: crypto.randomUUID(),

      ...dados,

      status: 'AGENDADO',

      criado_em: new Date(),
    };
    this.agendamentos.push(novo);
    this.salvar();
    return of(novo).pipe(delay(300));
  }

  _criar(dados: AgendamentoCreate): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, dados);
  }

  atualizarStatus(id: string, status: string): Observable<any> {
    const ag = this.agendamentos.find((a) => a.id === id);
    if (ag) {
      ag.status = status as any;
      ag.updated_at = new Date().toISOString();
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
    const ag = this.agendamentos.find((a) => a.id === id);
    if (ag) {
      // Simula armazenamento do nome do arquivo
      (ag as any).documento = file.name;
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
