import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class LecturasService {
  private apiUrl = 'http://airconnect-backend.test/api';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  // Obtener todas las lecturas
  getLecturas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lecturas`);
  }

  // Obtener la última lectura
  getUltimaLectura(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lecturas/ultima`);
  }

  // Obtener lecturas recientes (últimas N)
  getLecturasRecientes(limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/lecturas/recientes/${limit}`);
  }
}
