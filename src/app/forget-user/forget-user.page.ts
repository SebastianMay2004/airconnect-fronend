import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar,IonInput,IonButton,IonBackButton, IonButtons,IonList,IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-user',
  templateUrl: './forget-user.page.html',
  styleUrls: ['./forget-user.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonInput,IonButton,IonBackButton, IonButtons,IonList,IonItem]
})
export class ForgetUserPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  sendResetLink() {
    // Simulación de envío de enlace de restablecimiento
    this.router.navigate(['/login']);
  }

}
