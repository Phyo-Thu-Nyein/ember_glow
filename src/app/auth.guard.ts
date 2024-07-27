import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  if (isLoggedIn()) {
    return true; //User is authenticated
  } else {
    router.navigate(['/login']);
    return false;
  }
};

function isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}