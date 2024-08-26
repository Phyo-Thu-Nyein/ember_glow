import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-token-expired-dialog',
  templateUrl: './token-expired-dialog.component.html',
  styleUrls: ['./token-expired-dialog.component.css']
})
export class TokenExpiredDialogComponent {

  constructor(private router: Router, private dialogRef: MatDialogRef<TokenExpiredDialogComponent>, private loadingService: LoadingService) { }
  redirectToLogin() {
    this.dialogRef.close();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('pfp');
    this.loadingService.showLoading(); // show loading b4 navigate
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 460);
  }
}
