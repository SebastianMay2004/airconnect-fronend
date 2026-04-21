import { Component, OnInit, viewChild, AfterViewInit,ElementRef,ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon,IonFabList, IonButtons, IonMenuButton, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonList, IonLabel, IonItem, IonThumbnail,IonGrid, IonRow,IonCol, IonBadge, IonSelect,IonSelectOption} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {add,headset, chatbubble,help} from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Chart,registerables } from 'chart.js';
import {Database,ref,listVal,query,limitToLast} from '@angular/fire/database';  
import { from, Observable, timer } from 'rxjs';
import { map, switchMap,distinctUntilChanged } from 'rxjs/operators';
import { scan } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';

    provideFirebaseApp(() => initializeApp(environment)),


addIcons({add, headset,chatbubble,help});

Chart.register(...registerables);



@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [MenuComponent,IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab,IonFabButton,IonIcon,IonFabList,IonButtons, IonMenuButton, IonCardContent,IonCard, IonCardHeader, IonCardTitle, IonList, IonLabel,IonItem,IonThumbnail,IonGrid, IonRow,IonCol, IonBadge,IonSelect,IonSelectOption]
})
export class MainPage implements OnInit {

lecturas$: Observable<any>;
  dipositivos =[
  {
    nombre: 'equipo 1',
    img: 'assets/img/arduino.webp'
  }
];

  constructor(private router: Router, private db: Database) {

    
    //ESTO ES PARA LOS SENSORES XDDDDDDDDD
  const lecturasRef = ref(this.db, 'lecturas');
  // Mantenemos el límite al último para no saturar la memoria
  const lecturasQuery = query(lecturasRef, limitToLast(1));

  // Quitamos el timer y el switchMap
  this.lecturas$ = listVal(lecturasQuery).pipe(
    map(lecturas => lecturas && lecturas.length > 0 ? lecturas[0] : null),
    scan((prev: any, curr: any) => curr ?? prev, null)
  );




    
      addIcons({add,chatbubble,help,headset}); }
  @ViewChild('grafica') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit() {
    new Chart (this.canvas.nativeElement,{
      type:'line',
      data:{
        labels:['28-05','29-05','30-05','01-06','02-06','03-06'],
        datasets: [{
          label: 'CO2',
          data: [12, 100, 30, 50, 20, 30],
          borderColor: '#3673B5',
          backgroundColor: '#C5E1F8',
          pointBackgroundColor: (ctx: any ) =>{
            const value = ctx.parsed.y;
            if (value < 40) return '#4CAF50';
            if (value < 70) return '#FFC107';
            return '#F44336';
          }
        },
          {label: 'CO',
          data: [20, 30, 25, 28, 22, 27],
          borderColor: '#E67E22',
          backgroundColor: '#FAD7A0',
          pointBackgroundColor: (ctx: any ) =>{
            const value = ctx.parsed.y;
            if (value < 40) return '#4CAF50';
            if (value < 70) return '#FFC107';
            return '#F44336';
          }
          },
          {
            label: 'Humedad',
            data: [60, 55, 65, 70, 50, 75],
            borderColor: '#27AE60',
            backgroundColor: '#A9DFBF',
            pointBackgroundColor: (ctx: any ) =>{
            const value = ctx.parsed.y;
            if (value < 40) return '#4CAF50';
            if (value < 70) return '#FFC107';
            return '#F44336';
          }
          },
          {
            label: "PM.2.5",
            data: [15, 20, 10, 25, 18, 22],
            borderColor: '#8E44AD',
            backgroundColor: '#D2B4DE',
            pointBackgroundColor: (ctx: any ) =>{
            const value = ctx.parsed.y;
            if (value < 40) return '#4CAF50';
            if (value < 70) return '#FFC107';
            return '#F44336';
          }
          }
      ],    
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: 'transparent',
        plugins:{
          title:{
            display: true,
            text: 'Niveles'
          }
        }
        
      }
    })

  }

  goToSupport() {
    this.router.navigate(['/support']);
    
   }


   navegar(event: any) {
    const url = event.target.value;
    if (url) {
      this.router.navigate([url]);
    }
  }

  ngOnInit() {
  }

}
