import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OneRoomData, OneRoomDetails } from 'src/app/interface/allrooms-detail';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookingPaymentDetails } from 'src/app/interface/bookings-interface';
import { ConfettiService } from 'src/app/services/confetti.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  // Subscriptions
  roomSub: Subscription = new Subscription();

  // Variables
  bookingForm: FormGroup;
  roomId: string = '';
  startDate!: Date;
  endDate!: Date;
  roomData: OneRoomData = { images: []};
  roomImages?: string[];
  roomPrice?: number;
  totalNights?: number;
  totalAmount?: number;
  file: File | null = null;
  fileError: string | null = null;
  currentStep: number = 0;
  steps: number[] = [0, 1, 2];
  isPaymentLoading: boolean = false;

  // Error dialog (modal)
  isError: boolean = false;
  errorStatus?: number;
  errorMessage?: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private confettiService: ConfettiService // Confetti for successful payment
  ) {
    this.bookingForm = this.fb.group({
      fileUpload: [null, Validators.required],
    });
  }

  // On Initialization
  ngOnInit(): void {
    // get the data from param
    this.route.params.subscribe((params) => {
      this.roomId = params['roomId']; // room id
    });
    this.route.queryParams.subscribe((queryParams) => {
      const start = queryParams['start'];
      const end = queryParams['end'];

      if (start && end) {
        this.startDate = new Date(start); // start & end dates
        this.endDate = new Date(end);
      }
    });

    // get the room's detail
    this.getRoomInfo(this.roomId);
  }

  // LOGICS
  // Get the room's number, type, price, image, etc
  getRoomInfo(roomId: string) {
    var result = this.apiService.getRoomById(roomId);
    this.roomSub = result.subscribe({
      next: (response: OneRoomDetails) => {
        this.roomData = response.data!;
        this.roomImages = this.roomData.images!;
        this.roomPrice = this.roomData.price!;
        console.log('priceeeeeeee', this.roomPrice);
        this.calculateTotal();
      },
      error(err) {
        console.log("Error getting the room's info", err.message);
      },
    });
  }

  // Calculate the amount
  calculateTotal(): void {
    if (
      !this.startDate ||
      !this.endDate ||
      isNaN(this.startDate.getTime()) ||
      isNaN(this.endDate.getTime())
    ) {
      console.error('Invalid dates:', this.startDate, this.endDate);
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    this.totalNights = Math.round(
      Math.abs((this.endDate.getTime() - this.startDate.getTime()) / oneDay)
    );
    console.log('price of the room', this.roomPrice);
    this.totalAmount = this.totalNights * this.roomPrice!;
    console.log('Total Nights:', this.totalNights);
    console.log('Total Amount:', this.totalAmount);
  }

  // Book the room after filling the required form
  makeBooking() {
    this.isPaymentLoading = true;
    if (this.bookingForm.invalid || !this.file) {
      this.fileError = 'Please fill all required fields and upload a file';
      this.isPaymentLoading = false;
      return;
    }

    const formData = new FormData();
    formData.append('checkIn', this.startDate.toISOString());
    formData.append('checkOut', this.endDate.toISOString());
    formData.append('paymentMethod', 'BankTransfer');
    formData.append('paymentProof', this.file);

    this.apiService.createNewBooking(this.roomId, formData).subscribe({
      next: (response: BookingPaymentDetails) => {
        console.log('Booking successful', response.message);
        // Handle successful booking
        this.isPaymentLoading = false;
        this.currentStep = 2;
        this.confettiService.launchConfetti(); // Hoorayy!
      },
      error: (error) => {
        // Handle booking failure
        console.error('Booking failed', error);
        this.isPaymentLoading = false;
        this.currentStep = 1;
        this.errorStatus = error.status;
        this.errorMessage = error.error.message;
        this.isError = true;
      },
    });
  }

  // Click to proceed to the next step
  nextStep() {
    if (this.currentStep === 1 && !this.file) {
      this.fileError = 'Please upload your payment transaction check';
      return;
    }
    this.currentStep++;
  }
  previousStep() {
    this.currentStep--;
  }

  // Accept a file upload
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.fileError = null;
    }
  }

  // Finished booking
  finish() {
    this.router.navigateByUrl('/profile');
  }

  // Error dialog (modal/ handling)
  // error may happen after booking (reference makeBooking function)
  closePopup() {
    this.isError = false; // close the error popup
  }

  // On Destroy
  ngOnDestroy(): void {
    if (this.roomSub) {
      this.roomSub.unsubscribe();
    }
  }
}
