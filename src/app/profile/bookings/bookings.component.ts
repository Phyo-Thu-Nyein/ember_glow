import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  MyBookings,
  MyBookingsDatum,
} from 'src/app/interface/bookings-interface';
import { MyBookingsFilterParams } from 'src/app/interface/filter-params';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit, OnDestroy {
  // Subscription
  myBookingsSub: Subscription = new Subscription();

  // Variables
  myBookings: MyBookingsDatum[] = [];
  paymentProof: string = '';
  isFetching: boolean = false;

  // Filter params
  params: MyBookingsFilterParams = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    orderBy: 'desc',
    status: '',
  };

  // Pagination
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Oninit
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = { ...this.params, ...params };
      this.getMyBookings(this.params);
    });
  }
  // OnDestroy
  ngOnDestroy(): void {
    if (this.myBookingsSub) {
      this.myBookingsSub.unsubscribe();
    }
  }

  // LOGICS
  // Get my bookings
  getMyBookings(params: MyBookingsFilterParams) {
    this.isFetching = true;
    this.myBookingsSub = this.apiService.getMyBookings(params).subscribe({
      next: (response: MyBookings) => {
        this.myBookings = response.data!;
        this.currentPage = response.currentPage!;
        this.totalPages = response.totalPages!;
        this.isFetching = false;
      },
      error: (err) => {
        this.isFetching = false;
        console.log('Error fetching my bookings', err.error.message);
      },
    });
  }

  // Pagination
  onPageChange(pageNumber: number) {
    this.params.page = pageNumber;
    this.filterBookings();
  }
  resetPage() {
    // Update page param to reset it to 1
    this.params.page = 1;
  }

  // Filter my bookings via filter bar
  filterBookings() {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: this.params,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.getMyBookings(this.params);
      });
  }

  // Get payment proof for display for Dialog
  getPaymentProof(url: string) {
    this.paymentProof = url; // store the proof for later use
    console.log('this is a payment proof img url>>>', url);
  }
}
