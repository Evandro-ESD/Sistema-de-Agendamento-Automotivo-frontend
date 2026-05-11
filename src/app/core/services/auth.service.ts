/*import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse, User } from './../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8000/api/v1/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('user');
    if (stored) this.currentUserSubject.next(JSON.parse(stored));
  }
  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.currentUserSubject.next(res.user);
        }),
      );
  }

  register(
    nome: string,
    email: string,
    password: string,
    role: string = 'associado',
    oficina_id?: string,
    plano_id?: string,
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      nome,
      email,
      password,
      role,
      oficina_id,
      plano_id,
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { AuthResponse, User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const stored = localStorage.getItem('user');

    if (stored) {
      this.currentUserSubject.next(JSON.parse(stored));
    }
  }

  register(nome: string, email: string, senha: string): Observable<any> {
    const userExists = this.mockUsers.some((u) => u.email === email);

    if (userExists) {
      return throwError(() => ({
        status: 409,
        error: {
          detail: 'Usuário já cadastrado',
        },
      }));
    }

    const newUser: User = {
      id: `u_${this.mockUsers.length + 1}`,
      nome,
      email,
      senha,
      role: 'associado',
      created_at: new Date().toISOString(),
    };

    this.mockUsers.push(newUser);

    return of({
      message: 'Usuário cadastrado com sucesso',
    }).pipe(delay(500));
  }

  private mockUsers: User[] = [
    // No AuthService, adicione no array mockUsers:
    {
      id: 'u_1',
      nome: 'Evandro',
      email: 'admin@site.com',
      senha: '123456',
      role: 'admin_geral',
      created_at: new Date().toISOString(),
    },

    {
      id: 'u_2',
      nome: 'Rodrigo',
      email: 'rodrigo@oficina.com',
      senha: '123456',
      role: 'admin_oficina',
      oficina_id: 'of_1',
      created_at: new Date().toISOString(),
    },

    {
      id: 'u_3',
      nome: 'João',
      email: 'joao@gmail.com',
      senha: '123456',
      role: 'associado',
      oficina_id: 'of_1',
      created_at: new Date().toISOString(),
    },

    {
      id: 'u_4',
      nome: 'Carlos',
      email: 'carlos@gmail.com',
      senha: '123456',
      role: 'associado',
      oficina_id: 'of_1',
      created_at: new Date().toISOString(),
    },
    {
      id: 'u_5',
      nome: 'Gerente123',
      email: 'gerente123@email.com',
      senha: 'gerente123',
      role: 'admin_oficina',
      oficina_id: 'oficina_123',
      created_at: new Date().toISOString(),
    },

    {
      id: 'u_6',
      nome: 'Associado123',
      email: 'associado123@email.com',
      senha: 'associado123',
      role: 'associado',
      oficina_id: 'of_2',
      created_at: new Date().toISOString(),
    },
  ];

  login(email: string, senha: string): Observable<AuthResponse> {
    const user = this.mockUsers.find(
      (u) => u.email === email && u.senha === senha,
    );

    if (!user) {
      return throwError(() => new Error('Email ou senha inválidos'));
    }

    // const response: AuthResponse = {
    const response: AuthResponse = {
      access_token: 'fake-token',
      token_type: 'bearer',

      user: {
        id: user.id,
        nome: user.nome,
        senha: user.senha,
        email: user.email,
        role: user.role,
        oficina_id: user.oficina_id,
        plano_id: user.plano_id,
        created_at: user.created_at,
      },
    };

    return of(response).pipe(
      delay(500),

      tap((res) => {
        localStorage.setItem('token', res.access_token);

        localStorage.setItem('user', JSON.stringify(res.user));

        this.currentUserSubject.next(res.user);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');

    localStorage.removeItem('user');

    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  currentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
