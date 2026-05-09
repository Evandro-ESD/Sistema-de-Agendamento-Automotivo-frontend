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

  private mockUsers = [
    // No AuthService, adicione no array mockUsers:
{
  id: '3',
  nome: 'AdminGeral',
  email: 'admin@email.com',
  password: 'admin123',
  role: 'admin_geral',  // perfil admin_geral
},
    {
      id: '1',
      nome: 'Gerente123',
      email: 'gerente123@email.com',
      password: 'gerente123',
      role: 'admin_oficina',
      oficina_id: 'oficina_123',
    },

    {
      id: '2',
      nome: 'Associado123',
      email: 'associado123@email.com',
      password: 'associado123',
      role: 'associado',
    },
  ];

  constructor() {

    const stored = localStorage.getItem('user');

    if (stored) {
      this.currentUserSubject.next(JSON.parse(stored));
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {

    const user = this.mockUsers.find(
      (u) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      return throwError(() => new Error('Email ou senha inválidos'));
    }

    const response: AuthResponse = {
      access_token: 'fake-jwt-token-123',
      token_type: 'bearer',

      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        role: user.role as any,
        oficina_id: user.oficina_id,
      },
    };

    return of(response).pipe(
      delay(500),

      tap((res) => {

        localStorage.setItem(
          'token',
          res.access_token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(res.user)
        );

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
