import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, interval, switchMap } from 'rxjs';
import { Notificacao } from '../../models/notificacao';

@Injectable({ providedIn: 'root' })
export class NotificacaoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/v1/notificacoes';
  private audio = new Audio('/assets/alert.mp3');

  listarNaoLidas(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(this.apiUrl);
  }

  marcarLida(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/ler`, {});
  }

  // Inicia polling a cada 30s
  iniciarPolling(callback: (notif: Notificacao) => void) {
    interval(30000)
      .pipe(switchMap(() => this.listarNaoLidas()))
      .subscribe((notificacoes) => {
        notificacoes.forEach((notif) => {
          if (!notif.lida) {
            callback(notif);
            this.tocarSom();
            this.marcarLida(notif.id).subscribe();
          }
        });
      });
  }

  tocarSom() {
    this.audio
      .play()
      .catch((e) => console.log('Áudio bloqueado pelo navegador'));
  }

  exibirPopup(notif: Notificacao) {
    // Usa window.alert para simplicidade, mas poderia ser modal customizado
    alert(`${notif.titulo}\n${notif.mensagem}`);
  }
}
