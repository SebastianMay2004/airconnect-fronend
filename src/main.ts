import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';


import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(), 
    provideFirebaseApp(() => initializeApp(environment)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    
    //provideFirebaseApp(() => initializeApp({ projectId: "airconnect-f6bdc", appId: "1:910431924503:web:52b2a292f795ffcb280752", databaseURL: "https://airconnect-f6bdc-default-rtdb.firebaseio.com", storageBucket: "airconnect-f6bdc.firebasestorage.app", apiKey: "AIzaSyByVXFiVoo32zCdJSsefOEe7HeULk3404I", authDomain: "airconnect-f6bdc.firebaseapp.com", messagingSenderId: "910431924503", measurementId: "G-WJHVZ8HY9B", projectNumber: "910431924503", version: "2" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
  ],
});
