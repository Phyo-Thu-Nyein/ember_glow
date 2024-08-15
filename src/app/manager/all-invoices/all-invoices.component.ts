import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllInvoicesFilterParams } from 'src/app/interface/filter-params';
import { AllInvoices, InvoiceData } from 'src/app/interface/invoice';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-all-invoices',
  templateUrl: './all-invoices.component.html',
  styleUrls: ['./all-invoices.component.css'],
})
export class AllInvoicesComponent implements OnInit, OnDestroy {
  // Subscriptions
  allInvoicesSub: Subscription = new Subscription();

  // Variables
  invoices: InvoiceData[] = [];

  // Loadings
  isFetching: boolean = false;

  // Error Message
  isError: boolean = false;
  errorStatus: number = 0;
  errorMsg: string = '';

  // Filter params
  params: AllInvoicesFilterParams = {
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
    status: 'Paid',
    user: '',
    room: '',
    bookingId: '',
  };

  // Pagination
  totalPages: number = 0;
  currentPage: number = 1;

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
      this.getAllInvoices(this.params);
    });
  }
  ngOnDestroy(): void {
    if (this.allInvoicesSub) {
      this.allInvoicesSub.unsubscribe();
    }
  }

  // LOGICS
  // Get All Invoices
  getAllInvoices(params: AllInvoicesFilterParams) {
    this.isFetching = true; // Loading
    this.allInvoicesSub = this.apiService
      .getAllInvoices(params)
      .subscribe({
        next: (response: AllInvoices) => {
          this.invoices = response.data!;
          this.totalPages = response.totalPages!;
          this.currentPage = response.currentPage!;
          this.isFetching = false;
        },
        error: (err) => {
          this.isFetching = false;
          this.isError = true;
          this.errorStatus = err.status;
          this.errorMsg = err.error.message;
          console.log('Error fetching invoice(s)', err.error.message);
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

  // Filter invoices via filter bar
  filterBookings() {
    this.router
      .navigate([], {
        relativeTo: this.route,
        queryParams: this.params,
        queryParamsHandling: 'merge',
      })
      .then(() => {
        this.getAllInvoices(this.params);
      });
  }

  // Go to invoice detail page
  goToInvoiceDetails(invoiceId: string) {
    this.router.navigateByUrl(`invoice-details/${invoiceId}`);
  }
}
