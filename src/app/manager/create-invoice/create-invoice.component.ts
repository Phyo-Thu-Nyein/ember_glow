import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css'],
})
export class CreateInvoiceComponent implements OnInit, OnDestroy {
  // Subscriptions
  createInvoiceSub: Subscription = new Subscription();

  // Variables
  bookingId: string = '';
  invoiceId: string = ''; // pass it to the invoice details page

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  // Onint & Ondestroy
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookingId = params['bookingId'];
    });
  }
  ngOnDestroy(): void {
    if (this.createInvoiceSub) {
      this.createInvoiceSub.unsubscribe();
    }
  }

  // LOGICS
  // Submit the form

}
