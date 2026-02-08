import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';
import { MainPage } from './main/main.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'main',
    component: MainPage,
  },
  {
    path: 'support',
    loadComponent: () => import('./support/support.page').then( m => m.SupportPage)
  }
];
