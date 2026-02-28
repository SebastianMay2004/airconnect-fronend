import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon,IonFabList, IonButtons, IonMenuButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {add,headset, chatbubble,help} from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';


addIcons({add, headset,chatbubble,help});


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [MenuComponent,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab,IonFabButton,IonIcon,IonFabList,IonButtons, IonMenuButton]
})
export class MainPage implements OnInit {

  constructor(private router: Router) { }

  goToSupport() {
    this.router.navigate(['/support']);
    
   }

  ngOnInit() {
  }

}
