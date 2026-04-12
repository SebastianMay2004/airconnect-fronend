import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
  
})
export class Auth {
  //Cuando lo haga servidor cambiar la url a la del servidor


  //este es el de la maquina virtual, para acceder al localhost del host xddddddddddd cambielo cuando lo haga servidor
  private apiUrl = 'http://10.0.2.2:8000/api';
  //private apiUrl = 'http://127.0.0.1:8000/api';
  //private apiUrl = 'http://192.168.1.11:8000/api';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register-mobile`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login-mobile`, credentials);
  }

  // Guardar el token para futuras peticiones
  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

getUserProfile(): Observable<any> {
  const token = localStorage.getItem('auth_token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get(`${this.apiUrl}/user-profile`, { headers });
}


}
