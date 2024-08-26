import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-pre-create-invoice',
  templateUrl: './pre-create-invoice.component.html',
  styleUrls: ['./pre-create-invoice.component.css']
})
export class PreCreateInvoiceComponent implements OnDestroy {
  // Subscriptions
  validationSub: Subscription = new Subscription();

  // Variables
  bookingId: string = '';
  isChecking: boolean = false;
  isValid: boolean | null = null; 
  message: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router,
    private loadingService: LoadingService
  ) { }
  
  validateBookingId() {
    this.isChecking = true;
    this.validationSub = this.apiService.validateBookingId(this.bookingId).subscribe({
      next: (response: any) => {
        this.isChecking = false;
        this.isValid = true;
        this.message = response.message;
        setTimeout(() => {
          this.resetInput();
        }, 2500);
        this.goToCreateInvoice(this.bookingId);
      },
      error: (err) => {
        this.isChecking = false;
        this.isValid = false;
        this.message = err.error.message;
        setTimeout(() => {
          this.resetInput();
        }, 2500);
      }
    });
  }

  // Go to create invoice if valid after showing loading
  goToCreateInvoice(bookingId: string) {
    setTimeout(() => {
      this.loadingService.showLoading();
      setTimeout(() => {
        this.router.navigateByUrl(`create-invoice/${bookingId}`);
      }, 460);
    }, 1500);
  }

  // Reset the input if invalid
  resetInput() {
    this.isValid = null;
    this.message = '';
  }

  // On Destroy
  ngOnDestroy(): void {
    if (this.validationSub) {
      this.validationSub.unsubscribe();
    }
  }
}
