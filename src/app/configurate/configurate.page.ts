import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList,IonItem,IonBackButton, IonAvatar, IonLabel, IonButtons, IonIcon, IonButton, IonToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, settings, logOut, lockClosed, notifications, language, headset, informationCircle, moon } from 'ionicons/icons';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

addIcons({ home, settings, 'log-out': logOut,'lock-closed': lockClosed, notifications, language, headset, informationCircle, moon }); // Registro explícito por si acaso
@Component({
  selector: 'app-configurate',
  templateUrl: './configurate.page.html',
  styleUrls: ['./configurate.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,IonList,IonItem,IonBackButton,IonAvatar,IonLabel,IonButtons,IonIcon,IonButton,IonToggle]
})
export class ConfiguratePage implements OnInit {

  userData: any = {
    name: 'Cargando...' ,
    email: 'Cargando...',
    avatar: 'https://www.gravatar.com/avatar?d=mp&s=200' // Avatar por defecto
  }

  constructor(private authService: Auth, private router: Router) { }

  ngOnInit() {

      this.authService.getUserProfile().subscribe({
  next: (profile) => {
    this.userData = profile.userData;
    localStorage.setItem('user_data', JSON.stringify(profile));
    console.log('Perfil del usuario obtenido:', profile);
  },
  error: (error) => {
    console.error('Error al obtener el perfil del usuario:', error);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
});

    
  }

  toggleDarkMode(event: any) {
  document.body.classList.toggle('dark', event.detail.checked);
}

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
