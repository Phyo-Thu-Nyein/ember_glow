import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdditionalService, InvoiceData, OneInvoice } from 'src/app/interface/invoice';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {
  // Subscriptions
  invoiceSub: Subscription = new Subscription();

  // Variables
  isFetching: boolean = false;
  invoiceId: string = '';
  invoice: InvoiceData = {};
  additionalServices: AdditionalService[] = [];

  // Total Price for room stays
  roomTotalPrice: number = 0;

  // Error
  isError: boolean = false;
  errorStatus: number = 0;
  errorMsg: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute, private loadingService: LoadingService) { }
  
  // onint & ondestroy
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.invoiceId = params['invoiceId'];
    });
    this.getInvoice(this.invoiceId);
  }
  ngOnDestroy(): void {
    if (this.invoiceSub) {
      this.invoiceSub.unsubscribe();
    }
  }

  // LOGICS
  // Get the invoice details
  getInvoice(invoiceId: string) {
    this.isFetching = true;
    this.invoiceSub = this.apiService.getOneInvoice(invoiceId).subscribe({
      next: (response: OneInvoice) => {
        this.invoice = response.data!;
        this.roomTotalPrice = this.invoice.roomRate! * this.invoice.totalNights!;
        this.additionalServices = this.invoice.additionalServices!;
        this.isFetching = false;
      },
      error: (err) => {
        console.log("Error fetching invoice", err.error.message);
        this.isFetching = false;
        this.isError = true;
        this.errorStatus = err.status;
        this.errorMsg = err.error.message;
      }
    });
  }

  // Print the invoice or save it as a PDF?
  printInvoice() {
    const printContents = document.querySelector('.invoice-paper')?.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents!;

    window.print();

    // Restore original content after printing
    document.body.innerHTML = originalContents!;
    window.location.reload();
  }
}
