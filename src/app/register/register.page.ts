import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
// Importa el ModalController
import { ModalController, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonList } from '@ionic/angular/standalone';
// Importa el componente que quieres mostrar
import { TerminosComponent } from '../terminos/terminos.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonInput, IonButton, IonItem, IonList, RouterLink]
})
export class RegisterPage implements OnInit {

  // Inyectamos el controlador, NO el componente de términos
  constructor(private modalCtrl: ModalController, private router: Router) { }

  user ={
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

async registro() {
  const { username, email, password, confirmPassword } = this.user;

  // 1. Validaciones básicas
  if (!username || !email || !password || !confirmPassword) {
   // console.log(username, email, password, confirmPassword);
    alert('Por favor, completa todos los campos.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  if (password.length < 6 ) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  if (!email.includes('@')) {
    alert('Por favor, introduce un email válido.');
    return;
  }

  if (username.length < 3) {
    alert('El nombre de usuario debe tener al menos 3 caracteres.');
    return;
  }
   if (username.length > 20) {
    alert('El nombre de usuario no puede exceder los 20 caracteres.');
    return;
  }

  if (password.length > 50) {
    alert('La contraseña no puede exceder los 50 caracteres.');
    return;
  }

  if (password.includes(' ')) {
    alert('La contraseña no puede contener espacios.');
    return;
  }

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

  this.router.navigateByUrl('/main');

  
  } else {
    console.log('El usuario no aceptó los términos.');
  }
}
  ngOnInit() {}
}
