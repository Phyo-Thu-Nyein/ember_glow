import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  if (isLoggedIn()) {
    return true; //User is authenticated
  } else {
    return false;
  }
};

function isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}