import { Component, OnInit } from '@angular/core';
import { 
  IonMenu, IonHeader, IonToolbar, IonTitle, 
  IonContent, IonList, IonItem, IonIcon, IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, settings, logOut } from 'ionicons/icons';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'; // 1. Importar MenuController

addIcons({ home, settings, 'log-out': logOut }); // Registro explícito por si acaso

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel],
  template: `
    <ion-menu contentId="main-content" type="overlay">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Opciones</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item button (click)="navigate('/home')">
            <ion-icon slot="start" name="home"></ion-icon>
            <ion-label>Inicio</ion-label>
          </ion-item>
          
          <ion-item button (click)="navigate('/configurate')">
            <ion-icon slot="start" name="settings"></ion-icon>
            <ion-label>Configuración</ion-label>
          </ion-item>
          
          <ion-item button (click)="logout()">
            <ion-icon slot="start" name="log-out"></ion-icon> <ion-label>Cerrar sesión</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  `
})
export class MenuComponent implements OnInit {

  // 2. Inyectar MenuController
  constructor(private router: Router, private menuCtrl: MenuController) { }

  async navigate(url: string) {
    await this.menuCtrl.close(); // 3. Cerrar el menú antes de navegar
    this.router.navigateByUrl(url);
  }

  async logout() {
    await this.menuCtrl.close();
    console.log('Cerrando sesión...');
    // Aquí tu lógica de borrar token, etc.
  }

  ngOnInit() {}
}