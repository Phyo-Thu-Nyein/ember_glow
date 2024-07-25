import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OneRoomData, OneRoomDetails } from 'src/app/interface/allrooms-detail';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {

  // Subscriptions
  roomSub: Subscription = new Subscription();

  // Variables
  roomId: string = '';
  startDate!: Date;
  endDate!: Date;
  roomData!: OneRoomData;
  roomImages?: string[];
  paymentMethod: string = '';
  paymentMethods: string[] = ['Payment Method', 'BankTransfer'];
  file: File | null = null;
  fileError: string | null = null;
  currentStep: number = 0;
  steps: number[] = [0, 1, 2];


  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // On Initialization
  ngOnInit(): void {
    // get the data from param
    this.route.params.subscribe(params => {
      this.roomId = params['roomId']; // room id
    });
    this.route.queryParams.subscribe(queryParams => {
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
      },
      error(err) {
        console.log("Error getting the room's info", err.message);
      },
    });
  }

  // Book the room after filling the required form
  makeBooking(roomId: string) {
    this.apiService.createNewBooking(roomId);
  }

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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      this.fileError = null;
    }
  }


  // On Destroy
  ngOnDestroy(): void {
    if (this.roomSub) {
      this.roomSub.unsubscribe();
    }
  }
}
