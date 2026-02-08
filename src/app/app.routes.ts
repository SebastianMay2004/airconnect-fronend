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
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./forget-password/forget-password.page').then( m => m.ForgetPasswordPage)
  },
  {
    path: 'forget-user',
    loadComponent: () => import('./forget-user/forget-user.page').then( m => m.ForgetUserPage)
  },
  {
    path: 'configurate',
    loadComponent: () => import('./configurate/configurate.page').then( m => m.ConfiguratePage)
  }
];
