import { Component, OnInit } from '@angular/core';
import { 
  IonMenu, IonHeader, IonToolbar, IonTitle, 
  IonContent, IonList, IonItem, IonIcon, IonLabel 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, settings, logOut } from 'ionicons/icons';

addIcons({ home, settings, logOut });

@Component({
  selector: 'app-menu',
  //templateUrl: './menu.component.html',
  standalone: true,
  styleUrls: ['./menu.component.scss'],
  imports: [IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon, IonLabel],
  template: 
  `
    <ion-menu contentId="main-content" type="overlay">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Opciones</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item button>
            <ion-icon slot="start" name="home"></ion-icon>
            <ion-label>Inicio</ion-label>
          </ion-item>
          <ion-item button>
            <ion-icon slot="start" name="settings"></ion-icon>
            <ion-label>Configuración</ion-label>
          </ion-item>
          <ion-item button>
            <ion-icon slot="end" name="logOut"></ion-icon>
            <ion-label>Cerrar sesión</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
  `
})
export class MenuComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
