import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const alreadyLoggedInGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  if (isLoggedIn()) {
    router.navigate(['/profile']);
    return false; // User is already logged in, redirect to profile
  } else {
    return true; // User is not logged in, allow access to route
  }
};

function isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
