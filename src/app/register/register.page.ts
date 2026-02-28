import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';
// Importa el ModalController
import { ModalController, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonList, IonIcon, AlertController} from '@ionic/angular/standalone';
// Importa el componente que quieres mostrar
import { TerminosComponent } from '../terminos/terminos.component';
import { addIcons } from 'ionicons';
import { personCircle, mail, lockClosed, repeat } from 'ionicons/icons';

addIcons({
  'person-circle': personCircle, mail, lockClosed, repeat
});

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, IonItem, IonList, IonIcon, RouterLink,]
})
export class RegisterPage implements OnInit {

  // Inyectamos el controlador, NO el componente de términos
  constructor(private modalCtrl: ModalController, private router: Router, private authService: Auth,private alertController:AlertController) { }

  user ={
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error de Registro',
      message: message,
      buttons: ['OK']
    });   
    await alert.present();
  }

async registro() {
  const { name, email, password, confirmPassword } = this.user;

  // 1. Validaciones básicas
  if (!name || !email || !password || !confirmPassword) {
   // console.log(username, email, password, confirmPassword);
    this.presentAlert('Por favor, completa todos los campos.');
    return;
  }

  if (password !== confirmPassword) {
    this.presentAlert('Las contraseñas no coinciden.');
    return;
  }

  if (password.length < 6 ) {
    this.presentAlert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  if (!email.includes('@')) {
    this.presentAlert('Por favor, introduce un email válido.');
    return;
  }

  if (name.length < 3) {
    this.presentAlert('El nombre de usuario debe tener al menos 3 caracteres.');
    return;
  }
   if (name.length > 20) {
    this.presentAlert('El nombre de usuario no puede exceder los 20 caracteres.');
    return;
  }

  if (password.length > 50) {
    this.presentAlert('La contraseña no puede exceder los 50 caracteres.');
    return;
  }

  if (password.includes(' ')) {
    this.presentAlert('La contraseña no puede contener espacios.');
    return;
  }

  const dataLaravel = {
    name: this.user.name,
    email: this.user.email,
    password: this.user.password,
    password_confirmation: this.user.confirmPassword
  };

  // 2. Abrir el modal y ESPERAR el resultado
  const modal = await this.modalCtrl.create({
    component: TerminosComponent
  });

  await modal.present();

  // Esperamos a que el usuario cierre el modal
  const { data, role } = await modal.onDidDismiss();

  // 3. Si el usuario aceptó (role 'confirm'), procedemos
  if (role === 'confirm') {
    console.log('Usuario aceptó términos. Registrando...', this.user);
    // Aquí llamas a tu servicio de API o base de datos
    // this.authService.register(this.user);




    this.authService.register(dataLaravel).subscribe({
    next: (res) => {
      console.log('Usuario creado:', res);
      this.authService.saveToken(res.access_token);
      // Redirigir al home o login
      this.router.navigateByUrl('/main');
    },
    error: (err) => {
      console.error('Error en registro:', err.error.message);
    }
  });


  this.router.navigateByUrl('/main');

  
  } else {
    console.log('El usuario no aceptó los términos.');
  }
}
  ngOnInit() {}
}
