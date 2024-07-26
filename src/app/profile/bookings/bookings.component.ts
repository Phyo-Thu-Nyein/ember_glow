import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyBookings, MyBookingsDatum } from 'src/app/interface/bookings-interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnDestroy {
  // Subscription
  myBookingsSub: Subscription = new Subscription();

  // Variables
  myBookings: MyBookingsDatum[] = [];
  paymentProof: string = '';

  constructor(private apiService: ApiService) { }

  // Oninit
  ngOnInit(): void {
    this.getMyBookings();
  }
  // OnDestroy
  ngOnDestroy(): void {
    if (this.myBookingsSub) {
      this.myBookingsSub.unsubscribe();
    }
  }

  // LOGICS
  // Get my bookings
  getMyBookings() {
    this.myBookingsSub = this.apiService.getMyBookings().subscribe({
      next: (response: MyBookings) => {
        this.myBookings = response.data!;
      },
      error: (err) => {
        console.log("Error fetching my bookings", err.error.message);
      }
    });
  }
  // Get payment proof for display
  getPaymentProof(url: string) {
    this.paymentProof = url; // store the proof for later use
    console.log("this is a payment proof img url>>>", url);
  }
}
