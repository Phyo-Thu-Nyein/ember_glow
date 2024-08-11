import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);

  if (isLoggedIn()) {

    const allowedRoles = route.data['role'] as Array<number>;

    if (!allowedRoles || allowedRoles.length === 0) {
      return true; // No roles needed to access this route
    } else {
      const userRole = getUserRole();
      if (allowedRoles.includes(userRole)) {
        return true; // Authenticated and has one of the allowed roles
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