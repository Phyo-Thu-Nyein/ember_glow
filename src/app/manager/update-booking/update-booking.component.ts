import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  BookingStatus,
  OneBooking,
  OneBookingData,
  PaymentStatus,
} from 'src/app/interface/bookings-interface';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css'],
})
export class UpdateBookingComponent implements OnInit, OnDestroy {
  // Subscriptions
  oneBookingSub: Subscription = new Subscription();

  // Variables
  oneBooking: OneBookingData = {};
  bookingId: string = '';
  isFetching: boolean = false; // loading
  bookingStatus = BookingStatus;
  bookingStatusOptions: string[] = [];
  paymentStatus = PaymentStatus;
  paymentStatusOptions: string[] = [];

  // Update Mode variables
  isUpdateMode: boolean = false;
  isSaving: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  // OnInit & OnDestroy
  ngOnInit(): void {
    // Fetch the passed booking id from the paramter
    this.route.params.subscribe((params) => {
      this.bookingId = params['bookingId'];
      console.log('BOoking id is', this.bookingId);
      // Pass it to the function
      this.getBookingById(this.bookingId);
    });
  }
  ngOnDestroy(): void {
    if (this.oneBookingSub) {
      this.oneBookingSub.unsubscribe();
    }
  }

  // LOGICS
  // Get Booking by id
  getBookingById(bookingId: string) {
    this.isFetching = true;
    this.oneBookingSub = this.apiService.getOneBooking(bookingId).subscribe({
      next: (response: OneBooking) => {
        this.oneBooking = response.data!;
        this.bookingStatusOptions = Object.values(BookingStatus).filter(
          (bookingStatus) => bookingStatus != this.oneBooking.status
        );
        this.paymentStatusOptions = Object.values(PaymentStatus).filter(
          (paymentStatus) => paymentStatus != this.oneBooking.paymentStatus
        );
        this.isFetching = false;
      },
      error: (err) => {
        console.log('Error fetching the booking data', err.error.message);
        this.isFetching = false;
      },
    });
  }

  // Update Booking
  updateBooking() {
    this.isSaving = true;
    const bookingData = {
      status: this.oneBooking.status,
      paymentStatus: this.oneBooking.paymentStatus,
    };

    this.apiService.updateBooking(this.bookingId, bookingData).subscribe({
      next: (response: any) => {
        console.log('Booking updated successfully', response.data!);
        this.isSaving = false;
        this.toggleUpdateMode();
        this.getBookingById(this.bookingId);
        this.loadingService.showLoading(); // show loading b4 navigate
        setTimeout(() => {
          this.router.navigateByUrl('all-bookings');
        }, 460);
      },
      error: (err) => {
        console.log('Error updating booking', err.error.message);
        this.isSaving = false;
        this.toggleUpdateMode();
      },
    });
  }

  // Toggle Update Mode
  toggleUpdateMode() {
    this.isUpdateMode = !this.isUpdateMode;
  }
}
