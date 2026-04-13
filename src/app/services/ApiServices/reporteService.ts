// src/app/services/reporte.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '../auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private apiUrl = 'http://airconnect-backend.test/api';

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) {}

  /**
   * Descargar reporte PDF de todas las lecturas
   */
  async descargarReporteCompleto(): Promise<void> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    try {
      const response = await firstValueFrom(
        this.http.get(`${this.apiUrl}/reporte/lecturas`, {
          headers: headers,
          responseType: 'blob',
        }),
      );

      // ✅ Verificar que response existe y es un Blob
      if (response && response instanceof Blob) {
        await this.descargarBlobComoPDF(response, 'reporte_completo');
      } else {
        throw new Error('No se recibió el archivo PDF');
      }
    } catch (error) {
      console.error('Error descargando reporte:', error);
      throw error;
    }
  }

  /**
   * Descargar reporte por rango de fechas
   */
  async descargarReportePorRango(
    fechaInicio: string,
    fechaFin: string,
  ): Promise<void> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    try {
      const response = await firstValueFrom(
        this.http.post(
          `${this.apiUrl}/reporte/rango`,
          { fecha_inicio: fechaInicio, fecha_fin: fechaFin },
          { headers: headers, responseType: 'blob' },
        ),
      );

      // ✅ Verificar que response existe y es un Blob
      if (response && response instanceof Blob) {
        await this.descargarBlobComoPDF(
          response,
          `reporte_${fechaInicio}_${fechaFin}`,
        );
      } else {
        throw new Error('No se recibió el archivo PDF');
      }
    } catch (error) {
      console.error('Error descargando reporte:', error);
      throw error;
    }
  }

  /**
   * Descargar Blob como PDF en el navegador
   */
  private async descargarBlobComoPDF(
    blob: Blob,
    nombreBase: string,
  ): Promise<void> {
    const fileName = `${nombreBase}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.pdf`;
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
