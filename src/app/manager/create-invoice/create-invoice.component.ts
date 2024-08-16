import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { LoadingService } from 'src/app/services/loading.service';

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

  invoiceForm!: FormGroup;
  isOnSubmit: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) { }
  
  // Onint & Ondestroy
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookingId = params['bookingId'];
    });
    this.invoiceForm = this.fb.group({
      paymentMethod: ['Cash', Validators.required],
      additionalServices: this.fb.array([])
    });
  }
  ngOnDestroy(): void {
    if (this.createInvoiceSub) {
      this.createInvoiceSub.unsubscribe();
    }
  }

  // LOGICS
  // Submit the form
  submitForm() {
    this.isOnSubmit = true;
    if (this.invoiceForm?.valid) {
      const invoiceData = this.invoiceForm?.value;
      console.log("Invoice data>>>", invoiceData);

      this.createInvoiceSub = this.apiService.createInvoice(this.bookingId, invoiceData).subscribe({
        next: (response: any) => {
          this.isOnSubmit = false;
          this.invoiceId = response.data._id; // Get the invoice id and redirect to invoice details page
          console.log("Successfully created invoice", response.message);
          console.log("Invoice Id", this.invoiceId);
          this.goToInvoiceDetails(this.invoiceId);
        },
        error: (err) => {
          this.isOnSubmit = false;
          console.log("Error creating invoice", err.error.message);
        }
      });
    }

  }

  // Go to invoice detail to print it out after creation
  goToInvoiceDetails(invoiceId: string) {
    this.loadingService.showLoading();
    setTimeout(() => {
      this.router.navigateByUrl(`invoice-details/${invoiceId}`);
    }, 460);
  }

  // Getter for accessing additional services form array
  get additionalServices(): FormArray {
    return this.invoiceForm?.get('additionalServices') as FormArray;
  }

  // Add a new service row
  addServiceRow() {
    const serviceGroup = this.fb.group({
      description: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [0, [Validators.required, Validators.min(0)]]
    });
    this.additionalServices.push(serviceGroup);
  }

  // Remove a service row
  removeServiceRow(index: number) {
    this.additionalServices.removeAt(index);
  }

}
