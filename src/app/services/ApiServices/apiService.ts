import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Lectura {
  aire_mq135?: number;
  co_mq7?: number;
  gas_mq2?: number;
  humedad?: number;
  temperatura?: number;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AirconnectService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Probar conexión
  testConnection(): Observable<any> {
    return this.http.get(`${this.apiUrl}/test`);
  }

  // Obtener última lectura
  getUltimaLectura(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lecturas/ultima`);
  }

  // Obtener todas las lecturas
  getLecturas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/lecturas`);
  }

  // Obtener lecturas recientes (últimas N)
  getLecturasRecientes(limit: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/lecturas/recientes/${limit}`);
  }
}
