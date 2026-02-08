import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { IonButton,IonInput,IonList,IonItem, } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonInput, IonList,IonItem, RouterLink]
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  login(){
    // Aquí puedes agregar la lógica de autenticación, como verificar las credenciales del usuario
    // Por ahora, simplemente redirigiremos al usuario a la página principal después de hacer clic en el botón de inicio de sesión
    this.router.navigate(['/main']);
  }

  ngOnInit() {
  }

}
