import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OneRoomData, OneRoomDetails } from 'src/app/interface/allrooms-detail';
import { ApiService } from 'src/app/services/api.service';

const minDateValidator: ValidatorFn = (
  control: AbstractControl
): { [key: string]: boolean } | null => {
  if (control.value && control.value < new Date()) {
    return { minDate: true };
  }
  return null;
};

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.css'],
})
export class RoomDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  // Subscription
  oneRoomSub: Subscription = new Subscription();
  bookedDatesSub: Subscription = new Subscription();

  // Variables
  oneRoomData: OneRoomData = {};
  roomId: string = ''; // pass to booking details page
  bookedDates: { checkIn: string, checkOut: string }[] = [];
  checkLoggedIn: boolean = true;
  userRole: string | null = '0';
  // Image showcase
  bigImg: string = '';
  imgArray: OneRoomData['images'] = [];

  // Date picker
  range = new FormGroup({
    start: new FormControl<Date | null>(null, minDateValidator),
    end: new FormControl<Date | null>(null, minDateValidator),
  });
  checkInDateSelected = false;
  checkOutDateSelected = false;
  minCheckOutDate: Date | null = null;

  // Add the image selected effect
  @ViewChildren('smallImage') smallImageElements?: QueryList<
    ElementRef<HTMLImageElement>
  >;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // OnInit & OnDestroy
  ngOnInit(): void {
    this.loginCheck(); // check the user is logged in or not
    console.log("is logged in?", this.checkLoggedIn);
    this.userRole = localStorage.getItem('role');
    // GET the Room ID passed from parameter
    this.route.params.subscribe((params) => {
      const roomId = params['roomId'];
      this.getRoomDetailsById(roomId);
      this.getBookedDates(roomId);
    });
  }
  ngOnDestroy(): void {
    if (this.oneRoomSub) {
      this.oneRoomSub.unsubscribe();
    }
    if (this.bookedDatesSub) {
      this.bookedDatesSub.unsubscribe();
    }
  }

  // LOGICS
  // Get Room By ID
  getRoomDetailsById(roomId: string) {
    var result = this.apiService.getRoomById(roomId);
    this.oneRoomSub = result.subscribe({
      next: (response: OneRoomDetails) => {
        this.oneRoomData = response.data!;
        this.imgArray = this.oneRoomData.images!;
        this.bigImg = this.imgArray[0];
        this.roomId = this.oneRoomData._id!;
        // Add the selected class to the first image after setting imgArray
        setTimeout(() => {
          this.addInitialSelectedClass();
        });
      },
      error: (err) => {
        console.log('Error getting the room with such ID', err);
      },
    });
  }
  // Get Booked Dates
  getBookedDates(roomId: string) {
    this.bookedDatesSub = this.apiService.getBookedDates(roomId).subscribe({
      next: (response: any) => {
        this.bookedDates = response.data;
      },
      error: (err) => {
        console.log("Error getting booded dates", err.message);
      },
    });
  }

  // IMAGE EFFECT PART
  // Add the selected effect
  ngAfterViewInit(): void {
    this.addInitialSelectedClass();
  }
  // add the effect to the first image asa the page loads
  addInitialSelectedClass(): void {
    if (this.smallImageElements && this.smallImageElements.first) {
      this.smallImageElements.first.nativeElement.classList.add('selected-img');
    }
  }
  // add the effect on click
  addSelectedEffect(imageElement: EventTarget | null) {
    if (!imageElement) return; // exit if imageElement is null

    const htmlElement = imageElement as HTMLElement; // type casting here

    // Remove the selected class from all small images
    this.smallImageElements?.forEach((imgEl) => {
      imgEl.nativeElement.classList.remove('selected-img');
    });

    // Add the selected class to the current image element
    htmlElement.classList.add('selected-img');
  }
  // Change Image on click
  changeImg(img: string) {
    this.bigImg = img;
  }

  // DATE PICKER (CheckIn/ Out)
  // Check if a date is booked
  isDateBooked(date: Date): boolean {
    return this.bookedDates.some((booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return date >= checkIn && date <= checkOut;
    })
  }
  // Filter for check-in date picker (no date before today)
  checkInDateFilter = (date: Date | null): boolean => {
    if (!date) return true;
    const today = new Date();
    return date >= today && !this.isDateBooked(date);
  };

  // Filter for check-out date picker (no date before check-in date)
  checkOutDateFilter = (date: Date | null): boolean => {
    if (!date || !this.range.controls.start.value) return true;
    return date > this.range.controls.start.value && !this.isDateBooked(date);
  };

  // Method to handle check-in date change
  onCheckInDateChange(date: Date | null) {
    console.log('Check-In Date Changed:', date);
    this.checkInDateSelected = !!date;
    if (date) {
      this.minCheckOutDate = new Date(date);
      this.minCheckOutDate.setDate(this.minCheckOutDate.getDate() + 1); // Minimum check-out is the day after check-in
      this.range.controls.start.setValue(date);
    } else {
      this.minCheckOutDate = null;
      this.range.controls.end.reset();
    }
  }

  onCheckOutDateChange(event: any) {
    console.log('Check-Out Date Changed:', event.value);
    this.checkOutDateSelected = !!event.value;
    this.range.controls.end.setValue(event.value);
  }

  // REDIRECT TO THE BOOKING DETAILS PAGE AFTER SELECTING DATES
  onSubmit() {
    if (this.checkLoggedIn == false) {
      this.redirectToLogin();
    }
    else if (this.range.valid) {
      const { start, end } = this.range.value;
      console.log('Selected dates:', { start, end });
      this.router.navigate(['/payment', this.roomId], {
        queryParams: { start: start!.toISOString(), end: end!.toISOString() },
      });
    }
  }
  
  // Check if the user is logged in
  loginCheck() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.checkLoggedIn = false;
    }
  }
  // After log in, user should return back to his last page (position)
  redirectToLogin() {
    const returnUrl = this.router.url; // Get the current url
    this.router.navigate(['/login'], { queryParams: { returnUrl } });
  }
}
