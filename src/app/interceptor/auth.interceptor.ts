import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TokenExpiredDialogComponent } from '../components/token-expired-dialog/token-expired-dialog.component';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private dialog: MatDialog) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && error.error.message === 'Session expired. Please log in again.') {
          this.openSessionExpiredDialog();
        }
        return throwError(error);
      })
    );
  }

  // Method to open the session expired dialog
  openSessionExpiredDialog() {
    this.dialog.open(TokenExpiredDialogComponent, {
      disableClose: true, // Prevents the dialog from closing by clicking outside or pressing escape
    });
  }
}
