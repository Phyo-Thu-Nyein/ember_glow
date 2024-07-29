import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OneRoomData, OneRoomDetails } from 'src/app/interface/allrooms-detail';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-update-room',
  templateUrl: './update-room.component.html',
  styleUrls: ['./update-room.component.css'],
})
export class UpdateRoomComponent implements OnInit, OnDestroy {
  @ViewChildren('fileInput') fileInputs!: QueryList<ElementRef>;
  selectedImageIndex: number | null = null;

  // Subscriptions
  roomSub: Subscription = new Subscription();

  // Variables
  roomId: string = '';
  roomDetails: OneRoomData = {};
  isFetching: boolean = false; // loading

  // Update Mode variables
  isUpdateMode: boolean = false;
  isSaving: boolean = false;

  // Image upload part
  roomTypes: string[] = ['Suite', 'Superior', 'Deluxe', 'Standard'];
  tempFiles: File[] = []; // Temporary storage for images
  imgArray: string[] = [];
  dummyArray: number[] = []; // Array to hold dummy images

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // OnInit & OnDestroy
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.roomId = params['roomId']; // get the room id from param
      this.getRoomDetails(this.roomId); // pass it to the function
    });
  }
  ngOnDestroy(): void { 
    if (this.roomSub) {
      this.roomSub.unsubscribe();
    }
  }
  
  // LOGICS
  // Get Room details first
  getRoomDetails(roomId: string) {
    this.isFetching = true; // loading
    this.roomSub = this.apiService.getRoomById(roomId).subscribe({
      next: (response: OneRoomDetails) => {
        this.roomDetails = response.data!;
        this.imgArray = response.data?.images!;
        this.checkImgArray(); 
        this.isFetching = false; // loading
      },
      error: (err) => {
        console.log('Error fetching room details', err.error.message);
        this.isFetching = false; // loading
      }
    });
  }

  // Select image
  selectImage(index: number) {
    this.selectedImageIndex = index;
    this.fileInputs.toArray()[index].nativeElement.click();
  }
  selectDummyImage() {
    this.fileInputs.last.nativeElement.click();
  }

  onImageChange(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (index < this.imgArray.length) {
          this.imgArray[index] = e.target.result;
        } else {
          this.imgArray.push(e.target.result);
          this.checkImgArray();
        }
      }
      reader.readAsDataURL(file);
      this.tempFiles[index] = file; 
    }
  }

  // Add more image file if the img array is less than 5
  checkImgArray() {
    this.dummyArray = Array(5 - this.imgArray.length).fill(0).map((x, i) => i);
  }

  // Update Room
  updateRoom(roomId: string) { 
    this.isSaving = true;

    const formData = new FormData();
    formData.append('room_number', this.roomDetails.room_number!);
    formData.append('room_type', this.roomDetails.room_type!);
    formData.append('price', this.roomDetails.price?.toString()!);
    formData.append('description', this.roomDetails.description!); 

    // Append existing images that haven't been replaced
    this.imgArray.forEach((img, index) => {
      if (!this.tempFiles[index]) {
        formData.append('images', img);
      }
    });

    // Append new files for updated images
    this.tempFiles.forEach((file: File, index: number) => {
      if (file) {
        formData.append('images', file);
      }
    });

    // Update the room
    this.apiService.updateRoomById(roomId, formData).subscribe({
      next: (response: any) => {
        console.log('Room updated successfully');
        this.isSaving = false;
        this.toggleUpdateMode();
      },
      error: (err) => {
        console.log('Error updating the room', err.error.message);
        this.isSaving = false;
      }
    });
  }
  
  // Toggle Update Mode
  toggleUpdateMode() {
    this.isUpdateMode = !this.isUpdateMode;
  }
}
