import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, AlertController } from '@ionic/angular/standalone';
import { IonButton,IonInput,IonList,IonItem,IonIcon,IonImg } from '@ionic/angular/standalone';
import { Auth } from '../services/auth';
import { addIcons } from 'ionicons';
import { personCircle,mail, lockClosed } from 'ionicons/icons';

addIcons({
  'person-circle': personCircle, mail, lockClosed
});

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonList,IonItem, RouterLink,IonIcon,IonImg]
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private authService: Auth, private alertController: AlertController) {
      addIcons({mail,lockClosed}); }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Login', 
      message: message,
      buttons: ['OK']
    });   
    await alert.present();
  }

  user = {
    email: '',
    password: ''
  }

  login(){
    const { email, password } = this.user;

    if (!email || !password) {
      this.presentAlert('Por favor, completa todos los campos.');
      return;
    }
    const data = {
      email: this.user.email,
      password: this.user.password
    };


    this.authService.login(data).subscribe({
      next: (res) => {
        console.log('Login exitoso:', res);
        this.authService.saveToken(res.access_token);
        
        this.router.navigateByUrl('/main');
      },
      error: (err) => {
        console.error('Error en login:', err.error.message);
        this.presentAlert('Error al iniciar sesión. Verifica tus credenciales.');
      }
    });
  }

  ngOnInit() {
  }

}
