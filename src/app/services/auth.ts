import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  //Cuando lo haga servidor cambiar la url a la del servidor

  //este es el de la maquina virtual, para acceder al localhost del host xddddddddddd cambielo cuando lo haga servidor
  private apiUrl =
    'http://airconnect-backend.test/api'; /*esta es la ruta del back local/*          'http://10.0.2.2:8000/api'; */
  //private apiUrl = 'http://127.0.0.1:8000/api';
  //private apiUrl = 'http://192.168.1.11:8000/api';

  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }

  private loadStoredUser() {
    if (this.isAuthenticated()) {
      this.getUserProfile().subscribe({
        next: (res: any) => {
          if (res.success && res.user) {
            this.userSubject.next(res.user);
          }
        },
        error: () => this.removeToken(),
      });
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-mobile`, userData).pipe(
      tap((res: any) => {
        if (res.access_token) {
          this.saveToken(res.access_token);
          if (res.user) this.userSubject.next(res.user);
        }
      }),
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-mobile`, credentials).pipe(
      tap((res: any) => {
        if (res.access_token) {
          this.saveToken(res.access_token);
          if (res.user) this.userSubject.next(res.user);
        }
      }),
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout-mobile`, {}).pipe(
      tap(() => {
        this.removeToken();
        this.userSubject.next(null);
      }),
    );
  }

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  removeToken() {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ✅ Ya NO necesitas headers manuales
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-profile`);
  }

  getCurrentUser(): any {
    return this.userSubject.getValue();
  }
}