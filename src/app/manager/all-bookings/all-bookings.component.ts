import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AllBookings,
  AllBookingsDatum,
} from 'src/app/interface/bookings-interface';
import { AllBookingsFilterParams } from 'src/app/interface/filter-params';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css'],
})
export class AllBookingsComponent implements OnInit, OnDestroy {
  // Subscription
  allBookingsSub: Subscription = new Subscription();

  // Params filter
  params: AllBookingsFilterParams = {
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    roomNumber: '',
    bookingStatus: '',
    paymentStatus: '',
    bookingId: '',
  };

  // Variables
  bookingsDatum: AllBookingsDatum[] = [];
  paymentProofUrl: string = '';
  isFetching: boolean = false;

  // Pagination
  currentPage: number = 1;
  totalPages: number = 0;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute, 
    private loadingService: LoadingService
  ) {}

  // OnInit & OnDestroy
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.params = { ...this.params, ...params };
      this.getAllBookings(this.params);
    });
  }
  ngOnDestroy(): void {
    if (this.allBookingsSub) {
      this.allBookingsSub.unsubscribe();
    }
  }

  // LOGICS
  // Get all bookings
  getAllBookings(params: AllBookingsFilterParams) {
    this.isFetching = true;
    this.allBookingsSub = this.apiService.getAllBookings(params).subscribe({
      next: (response: AllBookings) => {
        this.bookingsDatum = response?.data!;
        this.currentPage = response.currentPage!;
        this.totalPages = response.totalPages!;
        this.isFetching = false;
      },
      error: (err) => {
        this.isFetching = false;
        console.log('Error fetching the bookings', err.error.message);
      },
    });
  }
  // get the proof url and store it
  getPaymentProof(proof: string) {
    this.paymentProofUrl = proof;
  }
  // Pass that clicked booking's id to the update booking page
  goToUpdateBooking(bookingId: string) {
    this.loadingService.showLoading();
    setTimeout(() => {
      this.router.navigateByUrl(`update-booking/${bookingId}`);
    }, 460);
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
        this.getAllBookings(this.params);
      });
  }
}
