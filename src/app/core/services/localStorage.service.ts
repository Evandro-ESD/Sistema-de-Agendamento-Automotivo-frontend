import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

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
}
