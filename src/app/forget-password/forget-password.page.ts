import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonInput,IonButton,IonBackButton, IonButtons,IonList,IonItem, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { mail } from 'ionicons/icons';

addIcons({ mail });


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput,IonButton,IonBackButton,IonButtons,IonList,IonItem, IonIcon, RouterLink]
})
export class ForgetPasswordPage implements OnInit {

  constructor(private router: Router) {
      addIcons({mail}); }

  ngOnInit() {
  }

  sendResetLink() {
    // Simulación de envío de enlace de restablecimiento
    this.router.navigate(['/login']);
  }

}
