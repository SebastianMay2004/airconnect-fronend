import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonButtons,
  IonMenuButton,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonList,
  IonLabel,
  IonItem,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  AlertController, // ✅ Agregar AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  add,
  headset,
  chatbubble,
  help,
  logOut,
  documentText,
  refresh,
} from 'ionicons/icons';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ReporteService } from '../services/ApiServices/reporteService';

// Registrar iconos
addIcons({ add, headset, chatbubble, help, logOut, documentText, refresh });
Chart.register(...registerables);

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [
    MenuComponent,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFab,
    IonFabButton,
    IonIcon,
    IonFabList,
    IonButtons,
    IonMenuButton,
    IonCardContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonLabel,
    IonItem,
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol,
    IonBadge,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonSpinner,
    IonRefresher,
    IonRefresherContent,
  ],
})
export class MainPage implements OnInit, AfterViewInit {
  // Datos de dispositivos
  dispositivos = [
    {
      nombre: 'AirConnect Pro',
      img: 'assets/img/arduino.webp',
      conectado: true,
    },
  ];

  // Datos de sensores (se llenarán desde la API)
  sensores: any[] = [];
  ultimaLectura: any = null;

  isLoading: boolean = true;
  errorMessage: string = '';

  @ViewChild('grafica') canvas!: ElementRef<HTMLCanvasElement>;
  private chart: Chart | null = null;

  constructor(
    private router: Router,
    private reporteService: ReporteService,
    private alertController: AlertController, // ✅ Agregar AlertController al constructor
  ) {
    addIcons({ add, chatbubble, help, headset, refresh, logOut, documentText });
  }

  // ✅ Método para descargar PDF
  async descargarPDF() {
    const loading = await this.alertController.create({
      header: 'Generando reporte',
      message: 'Por favor espera...',
      backdropDismiss: false,
    });

    await loading.present();

    try {
      await this.reporteService.descargarReporteCompleto();
      await loading.dismiss();

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'El reporte se ha generado correctamente',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error) {
      await loading.dismiss();
      console.error('Error al descargar PDF:', error);

      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo generar el reporte',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  ngOnInit() {
    this.cargarDatos();
  }

  ngAfterViewInit() {
    // Inicializar gráfica con datos de ejemplo mientras carga
    this.inicializarGraficaConEjemplo();
  }

  // Inicializar gráfica con datos de ejemplo
  inicializarGraficaConEjemplo() {
    setTimeout(() => {
      if (this.canvas && this.canvas.nativeElement) {
        this.chart = new Chart(this.canvas.nativeElement, {
          type: 'line',
          data: {
            labels: ['28-05', '29-05', '30-05', '01-06', '02-06', '03-06'],
            datasets: [
              {
                label: 'CO2',
                data: [12, 100, 30, 50, 20, 30],
                borderColor: '#3673B5',
                backgroundColor: '#C5E1F8',
                tension: 0.3,
                fill: false,
              },
              {
                label: 'CO',
                data: [20, 30, 25, 28, 22, 27],
                borderColor: '#E67E22',
                backgroundColor: '#FAD7A0',
                tension: 0.3,
                fill: false,
              },
              {
                label: 'Humedad',
                data: [60, 55, 65, 70, 50, 75],
                borderColor: '#27AE60',
                backgroundColor: '#A9DFBF',
                tension: 0.3,
                fill: false,
              },
              {
                label: 'PM2.5',
                data: [15, 20, 10, 25, 18, 22],
                borderColor: '#8E44AD',
                backgroundColor: '#D2B4DE',
                tension: 0.3,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Evolución de Sensores',
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        });
      }
    }, 100);
  }

  // Actualizar gráfica con datos reales
  actualizarGrafica(datos: any) {
    if (this.chart && datos && datos.charts) {
      this.chart.data.labels = datos.charts.labels.map((l: any) => `L${l}`);
      this.chart.data.datasets[0].data = datos.charts.mq135 || [];
      this.chart.data.datasets[1].data = datos.charts.mq7 || [];
      this.chart.update();
    }
  }

  // Cargar datos desde la API
  cargarDatos() {
    this.isLoading = true;
    this.errorMessage = '';

    // Simular carga de datos (aquí conectarás con tu servicio real)
    setTimeout(() => {
      // Datos de ejemplo para sensores
      this.sensores = [
        {
          nombre: 'Sensor de CO2 - Cocina',
          valor: '450',
          unidad: 'ppm',
          estado: 'bueno',
          limite: 'Normal < 100',
        },
        {
          nombre: 'Sensor Partículas - Hall',
          valor: '12',
          unidad: 'μg/m3',
          estado: 'bueno',
          limite: 'Normal < 25',
        },
        {
          nombre: 'Humedad - Almacén',
          valor: '85',
          unidad: '%',
          estado: 'critico',
          limite: 'Ideal 30-60%',
        },
        {
          nombre: 'Calidad Aire - Comedor',
          valor: '900',
          unidad: 'ppm',
          estado: 'critico',
          limite: 'Normal < 500',
        },
      ];

      this.ultimaLectura = {
        aire_mq135: 450,
        co_mq7: 25,
        temperatura: 24,
        humedad: 65,
      };

      this.isLoading = false;
    }, 1000);
  }

  // Refresh manual
  doRefresh(event: any) {
    this.cargarDatos();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  goToSupport() {
    this.router.navigate(['/support']);
  }

  navegar(event: any) {
    const url = event.detail.value;
    if (url) {
      this.router.navigate([url]);
    }
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
