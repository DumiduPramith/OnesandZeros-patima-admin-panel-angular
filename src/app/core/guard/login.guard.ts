import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (token) {
    const payload = atob(token.split('.')[1]); // decode payload of token
    const parsePayload = JSON.parse(payload);
    if (parsePayload.exp > Date.now() / 1000) {
      router.navigateByUrl('/dashboard');
      return false;
    }
  }
  return true;
};
