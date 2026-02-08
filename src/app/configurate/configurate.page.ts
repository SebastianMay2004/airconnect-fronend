import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList,IonItem,IonBackButton, IonAvatar, IonLabel, IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, settings, logOut, lockClosed, notifications, language, headset, informationCircle } from 'ionicons/icons';

addIcons({ home, settings, 'log-out': logOut,'lock-closed': lockClosed, notifications, language, headset, informationCircle }); // Registro explícito por si acaso
@Component({
  selector: 'app-configurate',
  templateUrl: './configurate.page.html',
  styleUrls: ['./configurate.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonList,IonItem,IonBackButton,IonAvatar,IonLabel,IonButtons,IonIcon,IonButton]
})
export class ConfiguratePage implements OnInit {

  constructor() { }



  ngOnInit() {
  }

}
