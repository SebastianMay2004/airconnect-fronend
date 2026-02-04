import { Component } from '@angular/core';
import { ModalController, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-terminos',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Términos y Condiciones</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Última actualización: 31 de marzo de 2025.
Bienvenido(a) a AirConnect. Antes de utilizar nuestra aplicación, te pedimos que leas atentamente los siguientes términos y condiciones. Al acceder y utilizar nuestra plataforma, aceptas cumplir con estos términos. Si no estás de acuerdo con ellos, te recomendamos no usar la aplicación.
1. Definiciones
Aplicación: Software desarrollado para el monitoreo y control de calidad del aire en cocinas, restaurantes y hoteles.
Usuario: Persona que accede y utiliza la aplicación.
Datos Ambientales: Información recopilada sobre la calidad del aire en el entorno monitoreado.
2. Uso de la Aplicación
La aplicación está diseñada para proporcionar información en tiempo real sobre la calidad del aire en espacios específicos.
El usuario es responsable del uso adecuado de la información proporcionada.
La aplicación no sustituye inspecciones profesionales ni garantiza cumplimiento de regulaciones sanitarias.
3. Registro y Seguridad
Para acceder a ciertas funciones, es posible que debas crear una cuenta.
Debes proporcionar información veraz y mantener la confidencialidad de tus credenciales.
No compartas tu cuenta con terceros ni intentes acceder a cuentas ajenas.
4. Recopilación y Uso de Datos
La aplicación recopila datos ambientales para su análisis y mejora de servicios.
La información puede ser utilizada con fines estadísticos o para reportes de calidad.
No compartimos datos personales con terceros sin tu consentimiento, salvo requerimiento legal.
5. Propiedad Intelectual
Todos los derechos de la aplicación, su diseño, código y contenido pertenecen a AirConnect.
No está permitido copiar, modificar o distribuir el contenido sin autorización.
6. Limitación de Responsabilidad
No garantizamos la exactitud absoluta de los datos en tiempo real, ya que pueden verse afectados por diversos factores externos.
No somos responsables por daños derivados del uso incorrecto de la información proporcionada por la aplicación.
7. Modificaciones y Actualizaciones
Nos reservamos el derecho de actualizar estos términos en cualquier momento.
Te notificaremos sobre cambios importantes a través de la aplicación o por correo electrónico.
8. Contacto
Si tienes preguntas sobre estos términos, puedes contactarnos en Soporte.</p>
      <ion-button expand="full" (click)="aceptar()">Aceptar</ion-button>
      <ion-button expand="full" color="light" (click)="cancelar()">Cerrar</ion-button>
    </ion-content>
  `
})
export class TerminosComponent {
  constructor(private modalCtrl: ModalController) {}

  aceptar() {
    // Cerramos pasando un rol para identificar la acción
    this.modalCtrl.dismiss({ aceptado: true }, 'confirm');
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}