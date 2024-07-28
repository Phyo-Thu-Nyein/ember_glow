import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OneBooking, OneBookingData } from 'src/app/interface/bookings-interface';
import { ApiService } from 'src/app/services/api.service';

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

  // Update Mode variables
  isUpdateMode: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  // OnInit & OnDestroy
  ngOnInit(): void {
    // Fetch the passed booking id from the paramter
    this.route.params.subscribe((params) => {
      this.bookingId = params['bookingId'];
      console.log('BOoking id is', this.bookingId);
    });
    // Pass it to the function
    this.getBookingById(this.bookingId);
  }
  ngOnDestroy(): void {
    if (this.oneBookingSub) {
      this.oneBookingSub.unsubscribe();
    }
  }

  // LOGICS
  // Get Booking by id
  getBookingById(bookingId: string) {
    this.oneBookingSub = this.apiService.getOneBooking(bookingId).subscribe({
      next: (response: OneBooking) => {
        this.oneBooking = response.data!;
      },
      error: (err) => {
        console.log('Error fetching the booking data', err.error.message);
      }
    });
  }

  // Toggle Update Mode
  toggleUpdateMode() {
    this.isUpdateMode = !this.isUpdateMode;
  }
}
