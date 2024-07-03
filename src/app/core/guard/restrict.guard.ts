import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const restrictGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (router.url === '/') {
    router.navigateByUrl('/dashboard');
    return false;
  }
  return true;
};
