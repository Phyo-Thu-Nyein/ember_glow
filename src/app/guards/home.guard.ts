import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const homeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (isLoggedIn()) {
    const userRole = getUserRole();
    if (userRole === 1 || userRole === 2) {
      router.navigate(['/dashboard']);
      return false;
    }
  }

  return true;
};

function isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}

function getUserRole(): number {
  const role = localStorage.getItem('role');
  return role ? parseInt(role, 10) : 0; // Default to Guest role if no role found
}
