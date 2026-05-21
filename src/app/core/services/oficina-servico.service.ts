import { Injectable, inject } from '@angular/core';

import { OficinaServico } from '../../models/oficina-servico';

import { Observable, of } from 'rxjs';
import { OficinaServicoDetalhado } from '../../models/oficina-servico-detalhado';
import { Servico } from '../../models/servico';
import { LocalStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class OficinaServicoService {
  private storage = inject(LocalStorageService);

  private storageKey = 'oficina_servicos';

  private localStorageService = inject(LocalStorageService);

  listar(): OficinaServico[] {
    return this.storage.get<OficinaServico[]>(this.storageKey) ?? [];
  }

  listarPorOficina(oficinaId: string): OficinaServico[] {
    return this.listar().filter(
      (item) => item.oficina_id === oficinaId && item.ativo,
    );
  }
  listarDetalhadoPorOficina(
    oficinaId: string,
  ): Observable<OficinaServicoDetalhado[]> {
    const oficinaServicos =
      this.localStorageService.get<OficinaServico[]>('oficina_servicos') ?? [];

    const servicos = this.localStorageService.get<Servico[]>('servicos') ?? [];

    const resultado = oficinaServicos
      .filter((os) => os.oficina_id === oficinaId && os.ativo)
      .map((os) => {
        const servico = servicos.find((s) => s.id === os.servico_id);

        if (!servico) {
          throw new Error(`Serviço ${os.servico_id} não encontrado`);
        }

        return {
          id: os.id,
          oficina_id: os.oficina_id,
          servico_id: os.servico_id,
          nome: servico.nome,
          preco: os.preco ?? 0,
          duracao_minutos: os.duracao_minutos,
        };
      });

    return of(resultado);
  }
}
