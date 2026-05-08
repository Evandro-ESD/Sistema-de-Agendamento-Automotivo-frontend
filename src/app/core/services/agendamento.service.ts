import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento, AgendamentoCreate } from '../../models/agendamento';

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/v1/agendamentos';

  listar(filtros?: {
    oficina_id?: string;
    data_inicio?: string;
    data_fim?: string;
  }): Observable<Agendamento[]> {
    let params: any = {};
    if (filtros) params = filtros;
    return this.http.get<Agendamento[]>(this.apiUrl, { params });
  }

  criar(dados: AgendamentoCreate): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, dados);
  }

  atualizarStatus(id: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/status`, { status });
  }

  cancelar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  enviarDocumento(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/documento`, formData);
  }
}
