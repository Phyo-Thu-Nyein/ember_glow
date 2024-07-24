import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OneRoomData, OneRoomDetails } from 'src/app/interface/allrooms-detail';
import { ApiService } from 'src/app/services/api.service';

const minDateValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
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

  // Variables
  oneRoomData: OneRoomData = {};
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
    private route: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  // OnInit & OnDestroy
  ngOnInit(): void {
    // GET the Room ID passed from parameter
    this.route.params.subscribe((params) => {
      const roomId = params['roomId'];
      this.getRoomDetailsById(roomId);
    });
  }
  ngOnDestroy(): void {
    if (this.oneRoomSub) {
      this.oneRoomSub.unsubscribe();
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
  // Filter for check-in date picker (no date before today)
  checkInDateFilter = (date: Date | null): boolean => {
    if (!date) return true;
    const today = new Date();
    return date >= today;
  };

  // Filter for check-out date picker (no date before check-in date)
  checkOutDateFilter = (date: Date | null): boolean => {
    if (!date || !this.range.controls.start.value) return true;
    return date > this.range.controls.start.value;
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

  onSubmit() {
    if (this.range.valid) {
      const { start, end } = this.range.value;
      console.log('Selected dates:', { start, end });
    }
  }

  // BOOK THE ROOM AFTER SELECTING DATES
}
