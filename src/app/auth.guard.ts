import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  if (isLoggedIn()) {

    const requiredRole = route.data['role'];

    if (requiredRole === undefined) {
      return true;
    } else {
      const userRole = getUserRole();
      if (userRole == requiredRole) {
        return true; // Authenticated and has the exact required role
      } else {
        router.navigate(['/login']);
        return false;
      }
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};

function isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

// Get the user's role
function getUserRole(): number {
  const role = localStorage.getItem('role');
  return role ? parseInt(role, 10) : 0; // Guest role if no role found
}