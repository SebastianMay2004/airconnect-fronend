
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const token = auth.getToken();

  console.log('🔐 Interceptor ejecutándose para:', req.url);

  if (token) {
    console.log('✅ Token encontrado, agregando a la petición');
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(cloned);
  }

  console.log('⚠️ Sin token, petición sin autenticación');
  return next(req);
};
